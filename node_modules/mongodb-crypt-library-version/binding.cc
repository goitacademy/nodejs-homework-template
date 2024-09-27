#include <napi.h>
#ifdef _WIN32
#include <windows.h>
#define MONGO_API_CALL __cdecl
#else
#include <dlfcn.h>
#define MONGO_API_CALL
#endif

using namespace Napi;

namespace {

// Naive RAII cleanup helper.
struct Cleanup {
  std::function<void()> fn;
  Cleanup(std::function<void()> fn) : fn(fn) {}
  ~Cleanup() { fn(); }
};

// pick the first truthy argument
template <typename T>
T&& pick(T&& arg) {
  return std::forward<T>(arg);
}

template <typename T, typename... U>
T&& pick(T&& arg, U&&... args) {
  return arg ? std::forward<T>(arg) : std::forward<T>(pick(args...));
}

#ifdef _WIN32
// Convert UTF-8 to a Windows UTF-16 WCHAR array.
std::vector<WCHAR> MultiByteToWideChar(const std::string& in) {
  std::vector<WCHAR> ret;
  int count = ::MultiByteToWideChar(CP_UTF8, 0, in.c_str(), in.size(), nullptr, 0);
  ret.resize(count + 1);
  ::MultiByteToWideChar(CP_UTF8, 0, in.c_str(), in.size(), ret.data(), ret.size());
  return ret;
}

// Throw an exception based on the last Windows error message.
void ThrowWindowsError(Env env, const char* call) {
  DWORD err = GetLastError();
  CHAR err_msg_buf[128];

  FormatMessageA(
      FORMAT_MESSAGE_FROM_SYSTEM |
      FORMAT_MESSAGE_IGNORE_INSERTS,
      nullptr,
      err,
      0,
      err_msg_buf,
      sizeof(err_msg_buf),
      nullptr);
  err_msg_buf[sizeof(err_msg_buf) - 1] = '\0';
  size_t err_msg_len = strlen(err_msg_buf);
  if (err_msg_len > 0 && err_msg_buf[err_msg_len - 1] == '\n') {
    err_msg_buf[strlen(err_msg_buf) - 1] = '\0';
    if (err_msg_len > 1 && err_msg_buf[err_msg_len - 2] == '\r') {
      err_msg_buf[err_msg_len - 2] = '\0';
    }
  }

  char buf[256];
  snprintf(buf,
           sizeof(buf),
           "%s failed with: %s (0x%lx)",
           call,
           err_msg_buf,
           static_cast<unsigned long>(err));
  throw Error::New(env, buf);
}
#endif

Value GetMongoCryptSharedLibraryVersion(const CallbackInfo& args) {
  Env env = args.Env();
  const std::string filename = args[0].ToString();

#ifdef _WIN32
  HMODULE lib = LoadLibraryW(MultiByteToWideChar(filename).data());
  if (!lib) {
    ThrowWindowsError(env, "LoadLibraryW");
  }
  Cleanup cleanup([&]() { FreeLibrary(lib); });
  auto load = [&](const char* name) -> FARPROC {
    return GetProcAddress(lib, name);
  };
#else
  void* lib = dlopen(filename.data(), RTLD_LAZY | RTLD_LOCAL);
  if (!lib) {
    throw Error::New(env, std::string("dlopen() failed: ") + dlerror());
  }
  Cleanup cleanup([&]() { dlclose(lib); });
  auto load = [&](const char* name) -> void* {
    return dlsym(lib, name);
  };
#endif

  auto get_version = pick(load("mongo_crypt_v1_get_version"), load("mongo_csfle_v1_get_version"));
  auto get_version_str = pick(load("mongo_crypt_v1_get_version_str"), load("mongo_csfle_v1_get_version_str"));
  auto aq = pick(load("mongo_crypt_v1_analyze_query"), load("mongo_csfle_v1_analyze_query"));

  uint64_t version;
  std::string version_str;
  if (!get_version || !get_version_str) {
    if (aq) {
      version = 0;
      version_str = "mongo_crypt_v1-unknown";
    } else {
      throw Error::New(env, "Path is not a MongoDB Crypt shared library");
    }
  } else {
    version = reinterpret_cast<uint64_t(MONGO_API_CALL*)()>(get_version)();
    version_str = reinterpret_cast<const char*(MONGO_API_CALL*)()>(get_version_str)();
  }

  Object result = Object::New(env);
  result["version"] = BigInt::New(env, version);
  result["versionStr"] = String::New(env, std::move(version_str));
  return result;
}

}

static Object InitGetMongoCryptSharedLibraryVersion(Env env, Object exports) {
  exports["getMongoCryptSharedLibraryVersion"] = Function::New(env, GetMongoCryptSharedLibraryVersion);
  return exports;
}

NODE_API_MODULE(mongodb_crypt_library_version, InitGetMongoCryptSharedLibraryVersion)
