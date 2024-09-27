const BUILD_INFO_OLD = {
  "version" : "2.6.11",
  "gitVersion" : "d00c1735675c457f75a12d530bee85421f0c5548 modules: enterprise",
  "OpenSSLVersion" : "OpenSSL 1.0.1f 6 Jan 2014",
  "sysInfo" : "Linux ip-10-203-203-194 3.13.0-24-generic #46-Ubuntu SMP Thu Apr 10 19:11:08 UTC 2014 x86_64 BOOST_LIB_VERSION=1_49",
  "loaderFlags" : "-fPIC -pthread -Wl,-z,now -rdynamic -Wl,-Bsymbolic-functions -Wl,-z,relro -Wl,-z,now -Wl,-E",
  "compilerFlags" : "-Wnon-virtual-dtor -Woverloaded-virtual -fPIC -fno-strict-aliasing -ggdb -pthread -Wall -Wsign-compare -Wno-unknown-pragmas -Winvalid-pch -pipe -Werror -O3 -Wno-unused-local-typedefs -Wno-unused-function -Wno-deprecated-declarations -fno-builtin-memcmp",
  "allocator" : "tcmalloc",
  "versionArray" : [
      2,
      6,
      11,
      0
    ],
  "javascriptEngine" : "V8",
  "bits" : 64,
  "debug" : false,
  "maxBsonObjectSize" : 16777216,
  "ok" : 1
};

const BUILD_INFO_3_2 = {
  "version" : "3.2.0-rc2",
  "gitVersion" : "8a3acb42742182c5e314636041c2df368232bbc5",
  "modules" : [
      "enterprise"
    ],
  "allocator" : "system",
  "javascriptEngine" : "mozjs",
  "sysInfo" : "deprecated",
  "versionArray" : [
      3,
      2,
      0,
      -48
    ],
  "openssl" : {
      "running" : "OpenSSL 0.9.8zg 14 July 2015",
      "compiled" : "OpenSSL 0.9.8y 5 Feb 2013"
    },
  "buildEnvironment" : {
      "distmod" : "",
      "distarch" : "x86_64",
      "cc" : "gcc: Apple LLVM version 5.1 (clang-503.0.40) (based on LLVM 3.4svn)",
      "ccflags" : "-fno-omit-frame-pointer -fPIC -fno-strict-aliasing -ggdb -pthread -Wall -Wsign-compare -Wno-unknown-pragmas -Winvalid-pch -Werror -O2 -Wno-unused-function -Wno-unused-private-field -Wno-deprecated-declarations -Wno-tautological-constant-out-of-range-compare -Wno-unused-const-variable -Wno-missing-braces -mmacosx-version-min=10.7 -fno-builtin-memcmp",
      "cxx" : "g++: Apple LLVM version 5.1 (clang-503.0.40) (based on LLVM 3.4svn)",
      "cxxflags" : "-Wnon-virtual-dtor -Woverloaded-virtual -stdlib=libc++ -std=c++11",
      "linkflags" : "-fPIC -pthread -Wl,-bind_at_load -mmacosx-version-min=10.7 -stdlib=libc++ -fuse-ld=gold",
      "target_arch" : "x86_64",
      "target_os" : "osx"
    },
  "bits" : 64,
  "debug" : false,
  "maxBsonObjectSize" : 16777216,
  "storageEngines" : [
      "devnull",
      "ephemeralForTest",
      "inMemory",
      "mmapv1",
      "wiredTiger"
    ],
  "ok" : 1
};

const CMD_LINE_OPTS = {
  "argv" : [
    "/opt/mongodb-osx-x86_64-enterprise-3.6.3/bin/mongod",
    "--dbpath=/Users/user/testdata"
  ],
  "parsed" : {
    "storage" : {
      "dbPath" : "/Users/user/testdata"
    }
  },
  "ok" : 1
};

const DOCUMENTDB_CMD_LINE_OPTS = {
  "ok" : 0,
  "errmsg" : "Feature not supported: getCmdLineOpts",
  "code" : 303
};

const COSMOSDB_BUILD_INFO = {
  "_t" : "BuildInfoResponse",
  "ok" : 1,
  "version" : "3.2.0",
  "gitVersion" : "45d947729a0315accb6d4f15a6b06be6d9c19fe7",
  "targetMinOS" : "Windows 7/Windows Server 2008 R2",
  "modules" : [ ],
  "allocator" : "tcmalloc",
  "javascriptEngine" : "Chakra",
  "sysInfo" : "deprecated",
  "versionArray" : [
    3,
    2,
    0,
    0
  ],
  "bits" : 64,
  "debug" : false,
  "maxBsonObjectSize" : 524288,
  "openssl" : {
    "running" : "OpenSSL 1.0.1p-fips 9 Jul 2015",
    "compiled" : "OpenSSL 1.0.1p-fips 9 Jul 2015"
  }
};

const DATALAKE_BUILD_INFO = {
  "ok": 1,
  "version": "3.6.0",
  "versionArray": [ 3, 6, 0, 0 ],
  "dataLake": {
    "version": "v20200329",
    "gitVersion": "0f318ss78bfad79ede3721e91iasj6f61644f",
    "date": "2020-03-29T15:41:22Z"
  }
}

module.exports = {
  BUILD_INFO_OLD,
  BUILD_INFO_3_2,
  CMD_LINE_OPTS,
  DOCUMENTDB_CMD_LINE_OPTS,
  COSMOSDB_BUILD_INFO,
  DATALAKE_BUILD_INFO
};
