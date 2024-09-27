#include <napi.h>

#ifndef _WIN32
#include <netdb.h>
#include <netinet/in.h>
#include <arpa/nameser.h>
#include <resolv.h>

namespace {

enum class QueryClass {
  INTERNET = ns_c_in
};

enum class QueryType {
  A = ns_t_a,
  AAAA = ns_t_aaaa,
  SRV = ns_t_srv,
  TXT = ns_t_txt,
  CNAME = ns_t_cname
};

class ResourceRecord {
 public:
  ResourceRecord(ns_msg* msg, size_t initial_pos);

  QueryType type() const;
  std::string read() const;

  ResourceRecord(ResourceRecord&&) = default;
  ResourceRecord& operator=(ResourceRecord&&) = default;

 private:
  ResourceRecord(const ResourceRecord&) = delete;
  ResourceRecord& operator=(const ResourceRecord&) = delete;

  std::string asTXT() const;
  std::string asA() const;
  std::string asAAAA() const;
  std::string asCNAME() const;
  std::string asSRV() const;
  std::pair<const uint8_t*, size_t> rawData() const;
  void assertType(QueryType expected) const;

  ns_rr record_;
  const uint8_t* start_ = nullptr;
  const uint8_t* end_ = nullptr;
  size_t pos_ = 0;
};

class DNSResponse {
 public:
  DNSResponse(const std::string& search, std::vector<uint8_t>&& raw_data);
  std::vector<ResourceRecord>& records() { return records_; }
  const std::vector<ResourceRecord>& records() const { return records_; }

 private:
  std::vector<uint8_t> raw_data_;
  std::vector<ResourceRecord> records_;
  ns_msg answer_;
};

class DNSController {
 public:
  DNSController();
  ~DNSController();

  DNSResponse Lookup(
      const std::string& name,
      QueryClass cls,
      QueryType type);

 private:
  DNSController(const DNSController&) = delete;
  DNSController& operator=(const DNSController&) = delete;

  struct __res_state state_;
};

ResourceRecord::ResourceRecord(ns_msg* msg, size_t pos)
  : start_(ns_msg_base(*msg)),
    end_(ns_msg_end(*msg)),
    pos_(pos) {
  if (ns_parserr(msg, ns_s_an, pos_, &record_) != 0) {
    throw std::runtime_error(
        std::string("Invalid record ") + std::to_string(pos) +
        " of DNS answer: " + strerror(errno));
  }
}

std::string ResourceRecord::asTXT() const {
  assertType(QueryType::TXT);
  const uint8_t* data;
  size_t len;
  std::tie(data, len) = rawData();
  if (len == 0 || data[0] > len - 1) {
    throw std::runtime_error("Invalid DNS TXT record received");
  }
  return std::string(data + 1, data + 1 + data[0]);
}

std::string ResourceRecord::asA() const {
  assertType(QueryType::A);
  const uint8_t* data;
  size_t len;
  std::tie(data, len) = rawData();

  if (len != 4) {
    throw std::runtime_error("Invalid DNS A record receive");
  }
  char ipv4[20];
  snprintf(ipv4, sizeof(ipv4), "%d.%d.%d.%d", data[0], data[1], data[2], data[3]);
  return ipv4;
}

std::string ResourceRecord::asAAAA() const {
  assertType(QueryType::AAAA);
  const uint8_t* data;
  size_t len;
  std::tie(data, len) = rawData();

  if (len != 16) {
    throw std::runtime_error("Invalid DNS A record receive");
  }
  char ipv6[60];
  snprintf(ipv6, sizeof(ipv6), "%02x%02x:%02x%02x:%02x%02x:%02x%02x:%02x%02x:%02x%02x:%02x%02x:%02x%02x",
    data[0], data[1], data[2], data[3],
    data[4], data[5], data[6], data[7],
    data[8], data[9], data[10], data[11],
    data[12], data[13], data[14], data[15]);
  return ipv6;
}

std::string ResourceRecord::asCNAME() const {
  assertType(QueryType::CNAME);
  const uint8_t* data;
  size_t len;
  std::tie(data, len) = rawData();
  if (len == 0 || data[0] > len - 1) {
    throw std::runtime_error("Invalid DNS CNAME record received");
  }
  std::string name(8192, '@');

  const int size = dn_expand(start_,
                             end_,
                             data,
                             &name[0],
                             name.size());

  if (size < 1) {
    throw std::runtime_error(std::string("Incorrect result ") +
      std::to_string(pos_) + " of CNAME answer: Invalid hostname format");
  }

  name.resize(name.find('\0'));
  return name;
}

std::string ResourceRecord::asSRV() const {
  assertType(QueryType::SRV);
  struct SrvHeader {
    uint16_t priority;
    uint16_t weight;
    uint16_t port;
  };
  const uint8_t* data;
  size_t len;
  std::tie(data, len) = rawData();

  if (data < start_ || data + sizeof(SrvHeader) > end_) {
    throw std::runtime_error(std::string("Incorrect result ") +
      std::to_string(pos_) + " of SRV answer: Incorrect result size");
  }
  SrvHeader header;
  memcpy(&header, data, sizeof(header));
  header.port = ntohs(header.port);
  header.priority = ntohs(header.priority);
  header.weight = ntohs(header.weight);

  // Use @ as an invalid hostname character.
  std::string name(8192, '@');

  const int size = dn_expand(start_,
                             end_,
                             data + sizeof(header),
                             &name[0],
                             name.size());

  if (size < 1) {
    throw std::runtime_error(std::string("Incorrect result ") +
      std::to_string(pos_) + " of SRV answer: Invalid hostname format");
  }

  name.resize(name.find('\0'));
  name += ':';
  name += std::to_string(header.port);
  name += ",prio=";
  name += std::to_string(header.priority);
  name += ",weight=";
  name += std::to_string(header.weight);

  return name;
}

QueryType ResourceRecord::type() const {
  return static_cast<QueryType>(ns_rr_type(record_));
}

std::pair<const uint8_t*, size_t> ResourceRecord::rawData() const {
  return { ns_rr_rdata(record_), ns_rr_rdlen(record_) };
}

DNSResponse::DNSResponse(const std::string& search, std::vector<uint8_t>&& raw_data)
  : raw_data_(std::move(raw_data)) {
  if (ns_initparse(&raw_data_[0], raw_data_.size(), &answer_) != 0) {
    throw std::runtime_error(std::string("Invalid DNS answer for \"") + search + "\"");
  }

  size_t nrecords = ns_msg_count(answer_, ns_s_an);
  if (nrecords == 0) return;

  for (size_t i = 0; i < nrecords; i++) {
    records_.emplace_back(&answer_, i);
  }
}

DNSController::DNSController() {
  errno = 0;
  if (res_ninit(&state_) != 0) {
    throw std::runtime_error(
      std::string("Could not perform DNS lookup, res_ninit() failed: ") +
      strerror(errno));
  }
}

DNSController::~DNSController() {
  res_nclose(&state_);
}

DNSResponse DNSController::Lookup(
    const std::string& name,
    QueryClass cls,
    QueryType type) {
  std::vector<uint8_t> answer(65536);
  h_errno = 0;
  int result = res_nsearch(
    &state_,
    name.c_str(),
    static_cast<int>(cls),
    static_cast<int>(type),
    &answer[0],
    answer.size());
  if (result < 0) {
    throw std::runtime_error(
      std::string("Failed to look up \"") + name + "\": " + hstrerror(h_errno));
  }
  answer.resize(result);
  answer.shrink_to_fit();
  return DNSResponse(name, std::move(answer));
}
#else
#include <windows.h>
#include <windns.h>

namespace {

enum class QueryClass {
  INTERNET
};

enum class QueryType {
  A = DNS_TYPE_A,
  AAAA = DNS_TYPE_AAAA,
  SRV = DNS_TYPE_SRV,
  TXT = DNS_TYPE_TEXT,
  CNAME = DNS_TYPE_CNAME
};

void FreeDnsRecordList(PDNS_RECORDA record) {
  DnsRecordListFree(record, DnsFreeRecordList);
}

class ResourceRecord {
 public:
  ResourceRecord(PDNS_RECORDA record);

  QueryType type() const;
  std::string read() const;

  ResourceRecord(ResourceRecord&&) = default;
  ResourceRecord& operator=(ResourceRecord&&) = default;

 private:
  ResourceRecord(const ResourceRecord&) = delete;
  ResourceRecord& operator=(const ResourceRecord&) = delete;

  std::string asTXT() const;
  std::string asA() const;
  std::string asAAAA() const;
  std::string asCNAME() const;
  std::string asSRV() const;
  void assertType(QueryType expected) const;

  PDNS_RECORDA record_;
};

class DNSResponse {
 public:
  DNSResponse(const std::string& search, PDNS_RECORDA results);
  std::vector<ResourceRecord>& records() { return records_; }
  const std::vector<ResourceRecord>& records() const { return records_; }

 private:
  std::shared_ptr<DNS_RECORDA> results_;
  std::vector<ResourceRecord> records_;
};

class DNSController {
 public:
  DNSController() = default;
  ~DNSController() = default;

  DNSResponse Lookup(
      const std::string& name,
      QueryClass cls,
      QueryType type);

 private:
  DNSController(const DNSController&) = delete;
  DNSController& operator=(const DNSController&) = delete;
};

ResourceRecord::ResourceRecord(PDNS_RECORDA record)
  : record_(record) {
}

std::string ResourceRecord::asTXT() const {
  assertType(QueryType::TXT);
  std::string ret;
  for (DWORD i = 0; i < record_->Data.TXT.dwStringCount; i++) {
    if (i > 0) ret += '\0';
    ret += record_->Data.TXT.pStringArray[i];
  }
  return ret;
}

std::string ResourceRecord::asA() const {
  assertType(QueryType::A);
  uint32_t addr = record_->Data.A.IpAddress;
  std::string rv;
  rv += std::to_string(addr & 0xFF);
  rv += '.';
  rv += std::to_string((addr >> 8) & 0xFF);
  rv += '.';
  rv += std::to_string((addr >> 16) & 0xFF);
  rv += '.';
  rv += std::to_string((addr >> 24) & 0xFF);
  return rv;
}

std::string ResourceRecord::asAAAA() const {
  assertType(QueryType::AAAA);
  const uint8_t* data = reinterpret_cast<const uint8_t*>(&record_->Data.AAAA.Ip6Address);
  char ipv6[60];
  snprintf(ipv6, sizeof(ipv6), "%02x%02x:%02x%02x:%02x%02x:%02x%02x:%02x%02x:%02x%02x:%02x%02x:%02x%02x",
    data[0], data[1], data[2], data[3],
    data[4], data[5], data[6], data[7],
    data[8], data[9], data[10], data[11],
    data[12], data[13], data[14], data[15]);
  return ipv6;
}

std::string ResourceRecord::asCNAME() const {
  assertType(QueryType::CNAME);
  return record_->Data.CNAME.pNameHost;
}

std::string ResourceRecord::asSRV() const {
  assertType(QueryType::SRV);
  const auto& srv = record_->Data.SRV;

  std::string name = srv.pNameTarget;
  name += ':';
  name += std::to_string(srv.wPort);
  name += ",prio=";
  name += std::to_string(srv.wPriority);
  name += ",weight=";
  name += std::to_string(srv.wWeight);

  return name;
}

QueryType ResourceRecord::type() const {
  return static_cast<QueryType>(record_->wType);
}

DNSResponse::DNSResponse(const std::string& search, PDNS_RECORDA results)
  : results_(results, FreeDnsRecordList) {

  for (PDNS_RECORDA cur = results; cur != nullptr; cur = cur->pNext) {
    records_.emplace_back(cur);
  }
}

DNSResponse DNSController::Lookup(
    const std::string& name,
    QueryClass cls,
    QueryType type) {
  PDNS_RECORDA results;
  DNS_STATUS status = DnsQuery_UTF8(
      name.c_str(),
      static_cast<WORD>(type),
      DNS_QUERY_STANDARD,
      nullptr,
      reinterpret_cast<PDNS_RECORD*>(&results),
      nullptr);

  if (status != 0) {
    throw std::system_error(
        status,
        std::system_category(),
        std::string("DNS Query for \"") + name + "\" failed");
  }
  return DNSResponse(name, results);
}
#endif

std::string ResourceRecord::read() const {
  switch (type()) {
    case QueryType::A:
      return asA();
    case QueryType::AAAA:
      return asAAAA();
    case QueryType::SRV:
      return asSRV();
    case QueryType::TXT:
      return asTXT();
    case QueryType::CNAME:
      return asCNAME();
  }
  return "";
}

void ResourceRecord::assertType(QueryType expected) const {
  if (expected != type()) {
    throw std::runtime_error(
        std::string("Tried to read response of type ") +
        std::to_string(static_cast<int>(type())) +
        " as type " +
        std::to_string(static_cast<int>(expected)));
  }
}

using namespace Napi;


class DNSWorker : public AsyncWorker {
 public:
  DNSWorker(
      Function callback,
      const std::string& name,
      QueryClass cls,
      QueryType type)
    : AsyncWorker(callback, "on-dns-native:DNSWorker"),
      name_(name),
      cls_(cls),
      type_(type) {}

  void Execute() override;
  void OnOK() override;

 private:
  using ResultEntry = std::pair<QueryType, std::string>;
  std::vector<ResultEntry> result_;
  std::string name_;
  QueryClass cls_;
  QueryType type_;
};

void DNSWorker::Execute() {
  DNSController controller;
  DNSResponse response = controller.Lookup(name_, cls_, type_);
  for (const ResourceRecord& record: response.records()) {
    result_.emplace_back(ResultEntry {
      record.type(), record.read()
    });
  }
}

void DNSWorker::OnOK() {
  HandleScope scope(Env());
  Array result = Array::New(Env(), result_.size());
  for (size_t i = 0; i < result_.size(); i++) {
    Object entry = Object::New(Env());
    entry["type"] = Number::New(Env(), static_cast<int>(result_[i].first));
    entry["value"] = String::New(Env(), result_[i].second);
    result[i] = entry;
  }
  Callback().Call({Env().Null(), result});
}

void Lookup(const CallbackInfo& args) {
  Function cb = args[3].As<Function>();
  std::string query = args[0].As<String>();
  int cls = args[1].As<Number>();
  int type = args[2].As<Number>();
  DNSWorker* wk = new DNSWorker(
      cb,
      std::move(query),
      static_cast<QueryClass>(cls),
      static_cast<QueryType>(type));
  wk->Queue();
}

} // anonymous namespace

static Object InitOSDnsNative(Env env, Object exports) {
  exports["lookup"] = Function::New(env, Lookup);
  Object constants = Object::New(env);
  constants["INTERNET"] = Number::New(env, static_cast<int>(QueryClass::INTERNET));
  constants["A"] = Number::New(env, static_cast<int>(QueryType::A));
  constants["AAAA"] = Number::New(env, static_cast<int>(QueryType::AAAA));
  constants["SRV"] = Number::New(env, static_cast<int>(QueryType::SRV));
  constants["TXT"] = Number::New(env, static_cast<int>(QueryType::TXT));
  constants["CNAME"] = Number::New(env, static_cast<int>(QueryType::CNAME));
  exports["constants"] = constants;
  return exports;
}

NODE_API_MODULE(os_dns_native, InitOSDnsNative)
