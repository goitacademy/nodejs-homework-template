[1mdiff --git a/app.js b/app.js[m
[1mindex 2105c35..40fd9bc 100644[m
[1m--- a/app.js[m
[1m+++ b/app.js[m
[36m@@ -19,8 +19,7 @@[m [mapp.use((req, res) => {[m
 })[m
 [m
 app.use((err, req, res, next) => {[m
[31m-  const { status = 404, message = "Server error" } = err;[m
[31m-  res.status(status).json({ message })[m
[32m+[m[32m  res.status(500).json({ message: err.message })[m
 })[m
 [m
 module.exports = app[m
[1mdiff --git a/helpers/createError.js b/helpers/createError.js[m
[1mdeleted file mode 100644[m
[1mindex 174b041..0000000[m
[1m--- a/helpers/createError.js[m
[1m+++ /dev/null[m
[36m@@ -1,6 +0,0 @@[m
[31m-const createError = (status, message) => {[m
[31m-    const error = new Error(message);[m
[31m-    error.status = status;[m
[31m-    return error;[m
[31m-}[m
[31m-module.exports=createError[m
\ No newline at end of file[m
[1mdiff --git a/helpers/index.js b/helpers/index.js[m
[1mdeleted file mode 100644[m
[1mindex 9e2045c..0000000[m
[1m--- a/helpers/index.js[m
[1m+++ /dev/null[m
[36m@@ -1,4 +0,0 @@[m
[31m-const createError = require("./createError")[m
[31m-module.exports = {[m
[31m-    createError[m
[31m-}[m
\ No newline at end of file[m
[1mdiff --git a/models/contacts.js b/models/contacts.js[m
[1mindex 29a7f38..409d11c 100644[m
[1m--- a/models/contacts.js[m
[1m+++ b/models/contacts.js[m
[36m@@ -1,59 +1,14 @@[m
[31m-const fs = require('fs/promises');[m
[31m-const { dirname } = require('path');[m
[32m+[m[32m// const fs = require('fs/promises')[m
 [m
[31m-const path = require('path');[m
[31m-const  uniqid = require('uniqid'); [m
[31m-const contactsPath = path.join(__dirname, "./contacts.json")[m
[32m+[m[32mconst listContacts = async () => {}[m
 [m
[31m-const listContacts = async () => {[m
[31m-  const list = await fs.readFile(contactsPath);[m
[31m-    const contacts = JSON.parse(list);[m
[31m-    return contacts;[m
[31m-}[m
[31m-[m
[31m-const getContactById = async (contactId) => {[m
[31m-  const list = await fs.readFile(contactsPath);[m
[31m-    const contacts = JSON.parse(list);[m
[31m-    const result = contacts.find(contact => contact.id === contactId);[m
[31m-    if (!result) { return null };[m
[31m-    return result;[m
[31m-}[m
[31m-[m
[31m-const removeContact = async (contactId) => {[m
[31m-  const list = await fs.readFile(contactsPath);[m
[31m-    const contacts = JSON.parse(list);[m
[31m-    const index = contacts.findIndex(contact => contact.id === contactId);[m
[31m-    if (index === -1) {[m
[31m-        return null[m
[31m-    }[m
[31m-    const delataContact = contacts.splice(index, 1);[m
[31m-    await fs.writeFile(contactsPath,JSON.stringify(contacts) );[m
[31m-    return delataContact[0] ;[m
[31m-}[m
[32m+[m[32mconst getContactById = async (contactId) => {}[m
 [m
[31m-const addContact = async ({name, email, phone}) => {[m
[31m-  const list = await fs.readFile(contactsPath);[m
[31m-    const contacts = JSON.parse(list);[m
[31m-    const newContact = { name, email, phone, id: uniqid() }[m
[31m-    contacts.push(newContact);[m
[31m-    await fs.writeFile(contactsPath, JSON.stringify(contacts));[m
[31m-    return newContact;[m
[32m+[m[32mconst removeContact = async (contactId) => {}[m
 [m
[31m-}[m
[31m-[m
[31m-const updateContact = async (contactId, body) => {[m
[31m-  const list = await fs.readFile(contactsPath);[m
[31m-  const contacts = JSON.parse(list);[m
[31m-  const indexContact = contacts.findIndex(contact => contact.id === contactId);[m
[31m-  if (indexContact === -1) {[m
[31m-        return null[m
[31m-  }[m
[31m-  contacts[indexContact] = { ...contacts[indexContact], ...body };[m
[31m-  await fs.writeFile(contactsPath, JSON.stringify(contacts));[m
[31m-  return contacts[indexContact];[m
[31m-[m
[31m-}[m
[32m+[m[32mconst addContact = async (body) => {}[m
 [m
[32m+[m[32mconst updateContact = async (contactId, body) => {}[m
 [m
 module.exports = {[m
   listContacts,[m
[1mdiff --git a/models/contacts.json b/models/contacts.json[m
[1mindex ee7ed2e..3f22d28 100644[m
[1m--- a/models/contacts.json[m
[1m+++ b/models/contacts.json[m
[36m@@ -1,74 +1,62 @@[m
 [[m
[31m-    {[m
[31m-        "id": "1",[m
[31m-        "name": "Allen Raymond",[m
[31m-        "email": "nulla.ante@vestibul.co.uk",[m
[31m-        "phone": "(992) 914-3792"[m
[31m-    },[m
[31m-    {[m
[31m-        "id": "2",[m
[31m-        "name": "SuperMan",[m
[31m-        "email": "dui.in@egetlacus.ca",[m
[31m-        "phone": "9111111"[m
[31m-    },[m
[31m-    {[m
[31m-        "id": "3",[m
[31m-        "name": "Kennedy Lane",[m
[31m-        "email": "mattis.Cras@nonenimMauris.net",[m
[31m-        "phone": "(542) 451-7038"[m
[31m-    },[m
[31m-    {[m
[31m-        "id": "4",[m
[31m-        "name": "ikehfhefjkrewlfer",[m
[31m-        "email": "est@utquamvel.net",[m
[31m-        "phone": "(692) 802-2949"[m
[31m-    },[m
[31m-    {[m
[31m-        "id": "10",[m
[31m-        "name": "dima fff",[m
[31m-        "email": "ihfrsgofg",[m
[31m-        "phone": "(501) 472-5218"[m
[31m-    },[m
[31m-    {[m
[31m-        "id": "6",[m
[31m-        "name": "Abbot Franks",[m
[31m-        "email": "scelerisque@magnis.org",[m
[31m-        "phone": "(186) 568-3720"[m
[31m-    },[m
[31m-    {[m
[31m-        "id": "7",[m
[31m-        "name": "Petro",[m
[31m-        "email": "Petrout@dictum.com",[m
[31m-        "phone": "0985985792"[m
[31m-    },[m
[31m-    {[m
[31m-        "id": "8",[m
[31m-        "name": "gggggggggg",[m
[31m-        "email": "dui.Fusce.diam@Donec.com",[m
[31m-        "phone": "(233) 738-2360"[m
[31m-    },[m
[31m-    {[m
[31m-        "id": "9",[m
[31m-        "name": "Thomas Lucas",[m
[31m-        "email": "Volvov50@Nulla.com",[m
[31m-        "phone": "(704) 398-7993"[m
[31m-    },[m
[31m-    {[m
[31m-        "id": "5",[m
[31m-        "name": "hifgohfdgjiodfgfdgiodkfgjoilkdfgf",[m
[31m-        "email": "ihfrsgofg",[m
[31m-        "phone": "(748) 206-2688"[m
[31m-    },[m
[31m-    {[m
[31m-        "name": "ikehfhefjkrewlfer",[m
[31m-        "email": "yidsjkfsdfsd",[m
[31m-        "phone": "8034543",[m
[31m-        "id": "g2pc89tkl5ocmomm"[m
[31m-    },[m
[31m-    {[m
[31m-        "name": "PetroGGGG",[m
[31m-        "email": "PetroutGGG@dictum.com",[m
[31m-        "phone": "0985985792",[m
[31m-        "id": "g2pc8pv0l5odjufr"[m
[31m-    }[m
[31m-][m
\ No newline at end of file[m
[32m+[m[32m  {[m
[32m+[m[32m    "id": "1",[m
[32m+[m[32m    "name": "Allen Raymond",[m
[32m+[m[32m    "email": "nulla.ante@vestibul.co.uk",[m
[32m+[m[32m    "phone": "(992) 914-3792"[m
[32m+[m[32m  },[m
[32m+[m[32m  {[m
[32m+[m[32m    "id": "2",[m
[32m+[m[32m    "name": "Chaim Lewis",[m
[32m+[m[32m    "email": "dui.in@egetlacus.ca",[m
[32m+[m[32m    "phone": "(294) 840-6685"[m
[32m+[m[32m  },[m
[32m+[m[32m  {[m
[32m+[m[32m    "id": "3",[m
[32m+[m[32m    "name": "Kennedy Lane",[m
[32m+[m[32m    "email": "mattis.Cras@nonenimMauris.net",[m
[32m+[m[32m    "phone": "(542) 451-7038"[m
[32m+[m[32m  },[m
[32m+[m[32m  {[m
[32m+[m[32m    "id": "4",[m
[32m+[m[32m    "name": "Wylie Pope",[m
[32m+[m[32m    "email": "est@utquamvel.net",[m
[32m+[m[32m    "phone": "(692) 802-2949"[m
[32m+[m[32m  },[m
[32m+[m[32m  {[m
[32m+[m[32m    "id": "5",[m
[32m+[m[32m    "name": "Cyrus Jackson",[m
[32m+[m[32m    "email": "nibh@semsempererat.com",[m
[32m+[m[32m    "phone": "(501) 472-5218"[m
[32m+[m[32m  },[m
[32m+[m[32m  {[m
[32m+[m[32m    "id": "6",[m
[32m+[m[32m    "name": "Abbot Franks",[m
[32m+[m[32m    "email": "scelerisque@magnis.org",[m
[32m+[m[32m    "phone": "(186) 568-3720"[m
[32m+[m[32m  },[m
[32m+[m[32m  {[m
[32m+[m[32m    "id": "7",[m
[32m+[m[32m    "name": "Reuben Henry",[m
[32m+[m[32m    "email": "pharetra.ut@dictum.co.uk",[m
[32m+[m[32m    "phone": "(715) 598-5792"[m
[32m+[m[32m  },[m
[32m+[m[32m  {[m
[32m+[m[32m    "id": "8",[m
[32m+[m[32m    "name": "Simon Morton",[m
[32m+[m[32m    "email": "dui.Fusce.diam@Donec.com",[m
[32m+[m[32m    "phone": "(233) 738-2360"[m
[32m+[m[32m  },[m
[32m+[m[32m  {[m
[32m+[m[32m    "id": "9",[m
[32m+[m[32m    "name": "Thomas Lucas",[m
[32m+[m[32m    "email": "nec@Nulla.com",[m
[32m+[m[32m    "phone": "(704) 398-7993"[m
[32m+[m[32m  },[m
[32m+[m[32m  {[m
[32m+[m[32m    "id": "10",[m
[32m+[m[32m    "name": "Alec Howard",[m
[32m+[m[32m    "email": "Donec.elementum@scelerisquescelerisquedui.net",[m
[32m+[m[32m    "phone": "(748) 206-2688"[m
[32m+[m[32m  }[m
[32m+[m[32m][m
[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex 49c5939..e6d0470 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -11,10 +11,7 @@[m
         "cors": "2.8.5",[m
         "cross-env": "7.0.3",[m
         "express": "4.17.1",[m
[31m-        "joi": "^17.6.0",[m
[31m-        "morgan": "1.10.0",[m
[31m-        "path": "^0.12.7",[m
[31m-        "uniqid": "^5.4.0"[m
[32m+[m[32m        "morgan": "1.10.0"[m
       },[m
       "devDependencies": {[m
         "eslint": "7.19.0",[m
[36m@@ -144,37 +141,6 @@[m
         "node": "^10.12.0 || >=12.0.0"[m
       }[m
     },[m
[31m-    "node_modules/@hapi/hoek": {[m
[31m-      "version": "9.3.0",[m
[31m-      "resolved": "https://registry.npmjs.org/@hapi/hoek/-/hoek-9.3.0.tgz",[m
[31m-      "integrity": "sha512-/c6rf4UJlmHlC9b5BaNvzAcFv7HZ2QHaV0D4/HNlBdvFnvQq8RI4kYdhyPCl7Xj+oWvTWQ8ujhqS53LIgAe6KQ=="[m
[31m-    },[m
[31m-    "node_modules/@hapi/topo": {[m
[31m-      "version": "5.1.0",[m
[31m-      "resolved": "https://registry.npmjs.org/@hapi/topo/-/topo-5.1.0.tgz",[m
[31m-      "integrity": "sha512-foQZKJig7Ob0BMAYBfcJk8d77QtOe7Wo4ox7ff1lQYoNNAb6jwcY1ncdoy2e9wQZzvNy7ODZCYJkK8kzmcAnAg==",[m
[31m-      "dependencies": {[m
[31m-        "@hapi/hoek": "^9.0.0"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@sideway/address": {[m
[31m-      "version": "4.1.4",[m
[31m-      "resolved": "https://registry.npmjs.org/@sideway/address/-/address-4.1.4.tgz",[m
[31m-      "integrity": "sha512-7vwq+rOHVWjyXxVlR76Agnvhy8I9rpzjosTESvmhNeXOXdZZB15Fl+TI9x1SiHZH5Jv2wTGduSxFDIaq0m3DUw==",[m
[31m-      "dependencies": {[m
[31m-        "@hapi/hoek": "^9.0.0"[m
[31m-      }[m
[31m-    },[m
[31m-    "node_modules/@sideway/formula": {[m
[31m-      "version": "3.0.0",[m
[31m-      "resolved": "https://registry.npmjs.org/@sideway/formula/-/formula-3.0.0.tgz",[m
[31m-      "integrity": "sha512-vHe7wZ4NOXVfkoRb8T5otiENVlT7a3IAiw7H5M2+GO+9CDgcVUUsX1zalAztCmwyOr2RUTGJdgB+ZvSVqmdHmg=="[m
[31m-    },[m
[31m-    "node_modules/@sideway/pinpoint": {[m
[31m-      "version": "2.0.0",[m
[31m-      "resolved": "https://registry.npmjs.org/@sideway/pinpoint/-/pinpoint-2.0.0.tgz",[m
[31m-      "integrity": "sha512-RNiOoTPkptFtSVzQevY/yWtZwf/RxyVnPy/OcA9HBM3MlGDnBEYL5B41H0MTn0Uec8Hi+2qUtTfG2WWZBmMejQ=="[m
[31m-    },[m
     "node_modules/@sindresorhus/is": {[m
       "version": "0.14.0",[m
       "resolved": "https://registry.npmjs.org/@sindresorhus/is/-/is-0.14.0.tgz",[m
[36m@@ -2200,18 +2166,6 @@[m
       "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",[m
       "integrity": "sha1-6PvzdNxVb/iUehDcsFctYz8s+hA="[m
     },[m
[31m-    "node_modules/joi": {[m
[31m-      "version": "17.6.0",[m
[31m-      "resolved": "https://registry.npmjs.org/joi/-/joi-17.6.0.tgz",[m
[31m-      "integrity": "sha512-OX5dG6DTbcr/kbMFj0KGYxuew69HPcAE3K/sZpEV2nP6e/j/C0HV+HNiBPCASxdx5T7DMoa0s8UeHWMnb6n2zw==",[m
[31m-      "dependencies": {[m
[31m-        "@hapi/hoek": "^9.0.0",[m
[31m-        "@hapi/topo": "^5.0.0",[m
[31m-        "@sideway/address": "^4.1.3",[m
[31m-        "@sideway/formula": "^3.0.0",[m
[31m-        "@sideway/pinpoint": "^2.0.0"[m
[31m-      }[m
[31m-    },[m
     "node_modules/js-tokens": {[m
       "version": "4.0.0",[m
       "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",[m
[36m@@ -2792,15 +2746,6 @@[m
         "node": ">= 0.8"[m
       }[m
     },[m
[31m-    "node_modules/path": {[m
[31m-      "version": "0.12.7",[m
[31m-      "resolved": "https://registry.npmjs.org/path/-/path-0.12.7.tgz",[m
[31m-      "integrity": "sha512-aXXC6s+1w7otVF9UletFkFcDsJeO7lSZBPUQhtb5O0xJe8LtYhj/GxldoL09bBj9+ZmE2hNoHqQSFMN5fikh4Q==",[m
[31m-      "dependencies": {[m
[31m-        "process": "^0.11.1",[m
[31m-        "util": "^0.10.3"[m
[31m-      }[m
[31m-    },[m
     "node_modules/path-exists": {[m
       "version": "3.0.0",[m
       "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-3.0.0.tgz",[m
[36m@@ -2880,14 +2825,6 @@[m
         "node": ">=4"[m
       }[m
     },[m
[31m-    "node_modules/process": {[m
[31m-      "version": "0.11.10",[m
[31m-      "resolved": "https://registry.npmjs.org/process/-/process-0.11.10.tgz",[m
[31m-      "integrity": "sha512-cdGef/drWFoydD1JsMzuFf8100nZl+GT+yacc2bEced5f9Rjk4z+WtFUTBu9PhOi9j/jfmBPu0mMEY4wIdAF8A==",[m
[31m-      "engines": {[m
[31m-        "node": ">= 0.6.0"[m
[31m-      }[m
[31m-    },[m
     "node_modules/progress": {[m
       "version": "2.0.3",[m
       "resolved": "https://registry.npmjs.org/progress/-/progress-2.0.3.tgz",[m
[36m@@ -3530,11 +3467,6 @@[m
       "integrity": "sha512-WxONCrssBM8TSPRqN5EmsjVrsv4A8X12J4ArBiiayv3DyyG3ZlIg6yysuuSYdZsVz3TKcTg2fd//Ujd4CHV1iA==",[m
       "dev": true[m
     },[m
[31m-    "node_modules/uniqid": {[m
[31m-      "version": "5.4.0",[m
[31m-      "resolved": "https://registry.npmjs.org/uniqid/-/uniqid-5.4.0.tgz",[m
[31m-      "integrity": "sha512-38JRbJ4Fj94VmnC7G/J/5n5SC7Ab46OM5iNtSstB/ko3l1b5g7ALt4qzHFgGciFkyiRNtDXtLNb+VsxtMSE77A=="[m
[31m-    },[m
     "node_modules/unique-string": {[m
       "version": "2.0.0",[m
       "resolved": "https://registry.npmjs.org/unique-string/-/unique-string-2.0.0.tgz",[m
[36m@@ -3604,14 +3536,6 @@[m
         "node": ">=4"[m
       }[m
     },[m
[31m-    "node_modules/util": {[m
[31m-      "version": "0.10.4",[m
[31m-      "resolved": "https://registry.npmjs.org/util/-/util-0.10.4.tgz",[m
[31m-      "integrity": "sha512-0Pm9hTQ3se5ll1XihRic3FDIku70C+iHUdT/W926rSgHV5QgXsYbKZN8MSC3tJtSkhuROzvsQjAaFENRXr+19A==",[m
[31m-      "dependencies": {[m
[31m-        "inherits": "2.0.3"[m
[31m-      }[m
[31m-    },[m
     "node_modules/utils-merge": {[m
       "version": "1.0.1",[m
       "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",[m
[36m@@ -3833,37 +3757,6 @@[m
         "strip-json-comments": "^3.1.1"[m
       }[m
     },[m
[31m-    "@hapi/hoek": {[m
[31m-      "version": "9.3.0",[m
[31m-      "resolved": "https://registry.npmjs.org/@hapi/hoek/-/hoek-9.3.0.tgz",[m
[31m-      "integrity": "sha512-/c6rf4UJlmHlC9b5BaNvzAcFv7HZ2QHaV0D4/HNlBdvFnvQq8RI4kYdhyPCl7Xj+oWvTWQ8ujhqS53LIgAe6KQ=="[m
[31m-    },[m
[31m-    "@hapi/topo": {[m
[31m-      "version": "5.1.0",[m
[31m-      "resolved": "https://registry.npmjs.org/@hapi/topo/-/topo-5.1.0.tgz",[m
[31m-      "integrity": "sha512-foQZKJig7Ob0BMAYBfcJk8d77QtOe7Wo4ox7ff1lQYoNNAb6jwcY1ncdoy2e9wQZzvNy7ODZCYJkK8kzmcAnAg==",[m
[31m-      "requires": {[m
[31m-        "@hapi/hoek": "^9.0.0"[m
[31m-      }[m
[31m-    },[m
[31m-    "@sideway/address": {[m
[31m-      "version": "4.1.4",[m
[31m-      "resolved": "https://registry.npmjs.org/@sideway/address/-/address-4.1.4.tgz",[m
[31m-      "integrity": "sha512-7vwq+rOHVWjyXxVlR76Agnvhy8I9rpzjosTESvmhNeXOXdZZB15Fl+TI9x1SiHZH5Jv2wTGduSxFDIaq0m3DUw==",[m
[31m-      "requires": {[m
[31m-        "@hapi/hoek": "^9.0.0"[m
[31m-      }[m
[31m-    },[m
[31m-    "@sideway/formula": {[m
[31m-      "version": "3.0.0",[m
[31m-      "resolved": "https://registry.npmjs.org/@sideway/formula/-/formula-3.0.0.tgz",[m
[31m-      "integrity": "sha512-vHe7wZ4NOXVfkoRb8T5otiENVlT7a3IAiw7H5M2+GO+9CDgcVUUsX1zalAztCmwyOr2RUTGJdgB+ZvSVqmdHmg=="[m
[31m-    },[m
[31m-    "@sideway/pinpoint": {[m
[31m-      "version": "2.0.0",[m
[31m-      "resolved": "https://registry.npmjs.org/@sideway/pinpoint/-/pinpoint-2.0.0.tgz",[m
[31m-      "integrity": "sha512-RNiOoTPkptFtSVzQevY/yWtZwf/RxyVnPy/OcA9HBM3MlGDnBEYL5B41H0MTn0Uec8Hi+2qUtTfG2WWZBmMejQ=="[m
[31m-    },[m
     "@sindresorhus/is": {[m
       "version": "0.14.0",[m
       "resolved": "https://registry.npmjs.org/@sindresorhus/is/-/is-0.14.0.tgz",[m
[36m@@ -5376,18 +5269,6 @@[m
       "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",[m
       "integrity": "sha1-6PvzdNxVb/iUehDcsFctYz8s+hA="[m
     },[m
[31m-    "joi": {[m
[31m-      "version": "17.6.0",[m
[31m-      "resolved": "https://registry.npmjs.org/joi/-/joi-17.6.0.tgz",[m
[31m-      "integrity": "sha512-OX5dG6DTbcr/kbMFj0KGYxuew69HPcAE3K/sZpEV2nP6e/j/C0HV+HNiBPCASxdx5T7DMoa0s8UeHWMnb6n2zw==",[m
[31m-      "requires": {[m
[31m-        "@hapi/hoek": "^9.0.0",[m
[31m-        "@hapi/topo": "^5.0.0",[m
[31m-        "@sideway/address": "^4.1.3",[m
[31m-        "@sideway/formula": "^3.0.0",[m
[31m-        "@sideway/pinpoint": "^2.0.0"[m
[31m-      }[m
[31m-    },[m
     "js-tokens": {[m
       "version": "4.0.0",[m
       "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",[m
[36m@@ -5827,15 +5708,6 @@[m
       "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",[m
       "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ=="[m
     },[m
[31m-    "path": {[m
[31m-      "version": "0.12.7",[m
[31m-      "resolved": "https://registry.npmjs.org/path/-/path-0.12.7.tgz",[m
[31m-      "integrity": "sha512-aXXC6s+1w7otVF9UletFkFcDsJeO7lSZBPUQhtb5O0xJe8LtYhj/GxldoL09bBj9+ZmE2hNoHqQSFMN5fikh4Q==",[m
[31m-      "requires": {[m
[31m-        "process": "^0.11.1",[m
[31m-        "util": "^0.10.3"[m
[31m-      }[m
[31m-    },[m
     "path-exists": {[m
       "version": "3.0.0",[m
       "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-3.0.0.tgz",[m
[36m@@ -5891,11 +5763,6 @@[m
       "integrity": "sha1-6SQ0v6XqjBn0HN/UAddBo8gZ2Jc=",[m
       "dev": true[m
     },[m
[31m-    "process": {[m
[31m-      "version": "0.11.10",[m
[31m-      "resolved": "https://registry.npmjs.org/process/-/process-0.11.10.tgz",[m
[31m-      "integrity": "sha512-cdGef/drWFoydD1JsMzuFf8100nZl+GT+yacc2bEced5f9Rjk4z+WtFUTBu9PhOi9j/jfmBPu0mMEY4wIdAF8A=="[m
[31m-    },[m
     "progress": {[m
       "version": "2.0.3",[m
       "resolved": "https://registry.npmjs.org/progress/-/progress-2.0.3.tgz",[m
[36m@@ -6400,11 +6267,6 @@[m
       "integrity": "sha512-WxONCrssBM8TSPRqN5EmsjVrsv4A8X12J4ArBiiayv3DyyG3ZlIg6yysuuSYdZsVz3TKcTg2fd//Ujd4CHV1iA==",[m
       "dev": true[m
     },[m
[31m-    "uniqid": {[m
[31m-      "version": "5.4.0",[m
[31m-      "resolved": "https://registry.npmjs.org/uniqid/-/uniqid-5.4.0.tgz",[m
[31m-      "integrity": "sha512-38JRbJ4Fj94VmnC7G/J/5n5SC7Ab46OM5iNtSstB/ko3l1b5g7ALt4qzHFgGciFkyiRNtDXtLNb+VsxtMSE77A=="[m
[31m-    },[m
     "unique-string": {[m
       "version": "2.0.0",[m
       "resolved": "https://registry.npmjs.org/unique-string/-/unique-string-2.0.0.tgz",[m
[36m@@ -6459,14 +6321,6 @@[m
         "prepend-http": "^2.0.0"[m
       }[m
     },[m
[31m-    "util": {[m
[31m-      "version": "0.10.4",[m
[31m-      "resolved": "https://registry.npmjs.org/util/-/util-0.10.4.tgz",[m
[31m-      "integrity": "sha512-0Pm9hTQ3se5ll1XihRic3FDIku70C+iHUdT/W926rSgHV5QgXsYbKZN8MSC3tJtSkhuROzvsQjAaFENRXr+19A==",[m
[31m-      "requires": {[m
[31m-        "inherits": "2.0.3"[m
[31m-      }[m
[31m-    },[m
     "utils-merge": {[m
       "version": "1.0.1",[m
       "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",[m
[1mdiff --git a/package.json b/package.json[m
[1mindex 0b43454..5045e82 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -12,8 +12,7 @@[m
     "cors": "2.8.5",[m
     "cross-env": "7.0.3",[m
     "express": "4.17.1",[m
[31m-    "morgan": "1.10.0",[m
[31m-    "uniqid": "^5.4.0"[m
[32m+[m[32m    "morgan": "1.10.0"[m
   },[m
   "devDependencies": {[m
     "eslint": "7.19.0",[m
[1mdiff --git a/routes/api/contacts.js b/routes/api/contacts.js[m
[1mindex 9ac4af2..a60ebd6 100644[m
[1m--- a/routes/api/contacts.js[m
[1m+++ b/routes/api/contacts.js[m
[36m@@ -1,94 +1,25 @@[m
[31m-const express = require('express');[m
[31m-const Joi = require('joi');[m
[32m+[m[32mconst express = require('express')[m
 [m
 const router = express.Router()[m
[31m-const contactsFun = require("../../models/contacts");[m
[31m-[m
[31m-const { createError } = require("../../helpers");[m
[31m-[m
[31m-const addContactSchema = Joi.object({[m
[31m-  name: Joi.string().alphanum().min(3).max(30).required(),[m
[31m-  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),[m
[31m-  phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),[m
[31m-[m
[31m-})[m
[31m-const updateContactSchema = Joi.object({[m
[31m-  name: Joi.string().alphanum().min(3).max(30),[m
[31m-  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),[m
[31m-  phone: Joi.string().length(10).pattern(/^[0-9]+$/),[m
[31m-[m
[31m-})[m
[31m-[m
[31m-[m
[31m-[m
 [m
 router.get('/', async (req, res, next) => {[m
[31m-  try {[m
[31m-    const list = await contactsFun.listContacts();[m
[31m-  res.json(list);[m
[31m-    [m
[31m-  } catch (error) {[m
[31m-    next(error)[m
[31m-  }[m
[32m+[m[32m  res.json({ message: 'template message' })[m
 })[m
 [m
 router.get('/:contactId', async (req, res, next) => {[m
[31m-  try {[m
[31m-    const id = req.params.contactId;[m
[31m-  const contact = await contactsFun.getContactById(id);[m
[31m-    if (!contact) {[m
[31m-      throw createError(404,"Not found")[m
[31m-    }[m
[31m-    res.json( contact);[m
[31m-  } catch (err) {[m
[31m-    next(err);[m
[31m-}[m
[32m+[m[32m  res.json({ message: 'template message' })[m
 })[m
 [m
 router.post('/', async (req, res, next) => {[m
[31m-  try {[m
[31m-    const {error}=addContactSchema.validate(req.body)[m
[31m-    if (error) {[m
[31m-      throw createError(400,"missing required name field")[m
[31m-    }[m
[31m-    const contact = await contactsFun.addContact(req.body);[m
[31m-    res.status(201).json(contact);[m
[31m-  } catch (error) {[m
[31m-   next(error);[m
[31m-  }[m
[31m-  [m
[32m+[m[32m  res.json({ message: 'template message' })[m
 })[m
 [m
 router.delete('/:contactId', async (req, res, next) => {[m
[31m-  try { [m
[31m-    const delateContact = await contactsFun.removeContact(req.params.contactId);[m
[31m-    [m
[31m-    if (!delateContact) {[m
[31m-      throw createError(404,"Not found")[m
[31m-    }[m
[31m-    res.json({ message : "contact deleted" });[m
[31m-[m
[31m-  } catch(error)[m
[31m-  {[m
[31m-    next(error)[m
[31m-  }[m
[32m+[m[32m  res.json({ message: 'template message' })[m
 })[m
 [m
 router.put('/:contactId', async (req, res, next) => {[m
[31m-  try {[m
[31m-    const {error}=updateContactSchema.validate(req.body)[m
[31m-    if (error || Object.keys(req.body).length === 0) {[m
[31m-      throw createError(400,"missing fields")[m
[31m-    }[m
[31m-    const contact = await contactsFun.updateContact(req.params.contactId, req.body)[m
[31m-    if (!contact) {[m
[31m-      throw createError(404,"Not found")[m
[31m-    }[m
[31m-    res.json(contact)[m
[31m-    [m
[31m-  } catch (error) {[m
[31m-    next(error)[m
[31m-  }[m
[32m+[m[32m  res.json({ message: 'template message' })[m
 })[m
 [m
 module.exports = router[m
