{
  'targets': [{
    'target_name': 'os_dns_native',
    'sources': [ 'binding.cc' ],
    'include_dirs': ["<!(node -p \"require('node-addon-api').include_dir\")"],
    'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
    'cflags!': [ '-fno-exceptions' ],
    'cflags_cc!': [ '-fno-exceptions' ],
    'xcode_settings': {
      'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
      'CLANG_CXX_LIBRARY': 'libc++',
      'MACOSX_DEPLOYMENT_TARGET': '10.7',
    },
    'msvs_settings': {
      'VCCLCompilerTool': { 'ExceptionHandling': 1 },
    },
    'conditions': [
      ['OS=="win"',  {
        "link_settings": {
          "libraries": ["-ldnsapi"]
        }
      }, {
        "link_settings": {
          "libraries": ["-lresolv"]
        }
      }]
    ]
  }]
}
