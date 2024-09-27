var regexes = [
  // Certificates and keys
  [/-----BEGIN CERTIFICATE-----.*-----END CERTIFICATE-----/mg, '<certificate>'],
  [/-----BEGIN RSA PRIVATE KEY-----.*-----END RSA PRIVATE KEY-----/mg, '<private key>'],

  // Electron app resources specific directories
  [/(file:\/\/)?\S+\/Contents\/Resources\/app\//mg, '$1/<path>/'],
  [/(file:\/\/)?([a-zA-Z]:)?\\\S+\\resources\\app\\/mg, '$1\\<path>\\'],
  [/(file:\/\/)?([a-zA-Z]:)?\/\S+\/resources\/app\//mg, '$1/<path>/'],

  // Generic user directories
  [/\/(Users?)\/[^/]*\//mg, '/$1/<user>/'],
  [/\/(usr|home|user|users|u01|var\/users|export\/home)\/[^/]*\//mg, '/$1/<user>/'],
  [/\\(Users|Documents and Settings|Profiles)\\[^/\\]*\\/mg, '\\$1\\<user>\\'],

  // Email addresses
  [/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/mgi, '<email>'],

  // IP addresses
  [/((1?[0-9][0-9]?|2[0-4][0-9]|25[0-5])\.){3}(1?[0-9][0-9]?|2[0-4][0-9]|25[0-5])/mg, '<ip address>'],

  // URLs
  [/(http(s)?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6})?\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/mgi, '<url>'],

  // MongoDB connection strings
  [/(mongodb:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=,]{2,256}(\.[a-z]{2,6})?\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/mgi, '<mongodb uri>'],

  // Compass Schema URL fragments
  [/#schema\/\w+\.\w+/, '#schema/<namespace>']
];

module.exports = regexes;
