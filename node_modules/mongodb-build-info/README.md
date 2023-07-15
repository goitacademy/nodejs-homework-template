# mongodb-build-info

Helpful functions to figure out if a connection is on Atlas, Atlas Data Lake,
Enterpise, or DocumentDB/CosmosDB.

# Usage
```js
const getBuildInfo = require('mongodb-build-info')
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('localhost:27017', function (err, client) {
  const adminDB = client.db('test').admin()
  let buildInfo;

  adminDB.command({ buildInfo: 1 }, {}, parseBuildInfo)
  adminDB.command({ getCmdLineOpts: 1 }, {}, parseCmdLineOpts)

  function parseBuildInfo (err, res) {
    if (err) console.log('Command failed, ', err)
    buildInfo = res

    const { isDataLake, dlVersion } = getBuildInfo.getDataLake(buildInfo)
    const isEnterprise = getBuildInfo.isEnterprise(buildInfo)
  }

  function parseCmdLineOpts (err, res) {
    if (err) console.log('Command failed', err.message)
    
    const { isGenuine, serverName } = getGenuineMongoDB(buildInfo, res)
  }
})
```

## API
### getDataLake(buildInfo)
Returns an object:

__isDataLake__: boolean. 
__dlVersion__: version of dataLake, a string.

### isEnterprise(buildInfo)
Returns a boolean.

### isAtlas(uri)
Returns a boolean.

### isLocalhost(uri)
Returns a boolean.

### isDigitalOcean(uri)
Returns a boolean.

### getGenuineMongoDB(buildInfo, cmdLineOpts)
Returns an object:

__isGenuine__: boolean. 
__serverName__: name of the server (mongoDB, cosmosDB, or documentDB).

### getBuildEnv(buildInfo)
Returns an object:

__serverOs__: build's OS version (macOS, linux, windows etc.).
__serverArch__: build's architecture (e.g. x86_64).

# Installation
```
npm install -S mongodb-build-info
```

# License
Apache-2.0
