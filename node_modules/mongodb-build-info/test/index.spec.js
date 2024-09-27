const expect = require('chai').expect;
const fixtures = require('./fixtures');
const isAtlas = require('../.').isAtlas;
const getDataLake = require('../.').getDataLake;
const isLocalhost = require('../.').isLocalhost;
const isDigitalOcean = require('../.').isDigitalOcean;
const getBuildEnv = require('../.').getBuildEnv;
const isEnterprise = require('../.').isEnterprise;
const getGenuineMongoDB = require('../.').getGenuineMongoDB;

describe('mongodb-build-info', () => {
  context('isDataLake', () => {
    it('reports on DataLake', () => {
      const isDL = getDataLake(fixtures.DATALAKE_BUILD_INFO);
      expect(isDL.isDataLake).to.be.true;
      expect(isDL.dlVersion).to.equal('v20200329');
    });

    it('does not report on 3.2', () => {
      const isDL = getDataLake(fixtures.BUILD_INFO_3_2);
      expect(isDL.isDataLake).to.be.false;
      expect(isDL.dlVersion).to.equal(null);
    });

    it('does not report on older versions', () => {
      const isDL = getDataLake(fixtures.BUILD_INFO_OLD);
      expect(isDL.isDataLake).to.be.false;
      expect(isDL.dlVersion).to.equal(null);
    });
  });

  context('isEnterprise', () => {
    it('detects enterprise module for 2.6 and 3.0', () => {
      expect(isEnterprise(fixtures.BUILD_INFO_OLD)).to.be.true;
    });

    it('detects enterprise module for >= 3.2', () => {
      expect(isEnterprise(fixtures.BUILD_INFO_3_2)).to.be.true;
    });
  });

  context('getBuildEnv', () => {
    it('returns server os and server arch', () => {
      const buildEnv = getBuildEnv(fixtures.BUILD_INFO_3_2);
      expect(buildEnv.serverOs).to.equal('osx');
      expect(buildEnv.serverArch).to.equal('x86_64');
    });
  });

  context('isAtlas', () => {
    it('reports on atlas', () => {
      expect(isAtlas('mongodb+srv://admin:catscatscats@cat-data-sets.cats.mongodb.net/admin')).to.be.true;
      expect(isAtlas('mongodb://admin:catscatscats@cat-data-sets.cats.mongodb.net/admin')).to.be.true;
      expect(isAtlas('mongodb://admin:catscatscats@cat-data-sets.cats1.mongodb.net,cat-data-sets.cats2.mongodb.net/admin')).to.be.true;
    });

    it('works with host only', () => {
      expect(isAtlas('cat-data-sets.cats.mongodb.net:27017')).to.be.true;
    });

    it('works with hostname', () => {
      expect(isAtlas('cat-data-sets.cats.mongodb.net')).to.be.true;
    });

    it('returns true with atlas dev', () => {
      expect(isAtlas('mongodb+srv://admin:catscatscats@cat-data-sets.cats.mongodb-dev.net/admin')).to.be.true;
      expect(isAtlas('cat-data-sets.cats.mongodb-dev.net')).to.be.true;
    });

    it('returns false if not atlas', () => {
      expect(isAtlas('cat-data-sets.cats.mangodb.net')).to.be.false;
      expect(isAtlas('cat-data-sets.catsmongodb.net')).to.be.false;
      expect(isAtlas('cat-data-sets.cats.mongodb.netx')).to.be.false;
      expect(isAtlas('cat-data-sets.cats.mongodb.com')).to.be.false;
      expect(isAtlas('localhost')).to.be.false;
    });

    it('does not throw and returns with invalid argument', () => {
      expect(isAtlas(123)).to.be.false;
      expect(isAtlas('')).to.be.false;
      expect(isAtlas({})).to.be.false;
      expect(isAtlas(undefined)).to.be.false;
      expect(isAtlas(null)).to.be.false;
    });
  });

  context('isLocalhost', () => {
    it('reports on localhost', () => {
      expect(isLocalhost('localhost:27019')).to.be.true;
    });

    it('reports on localhost of type 127.0.0.1', () => {
      expect(isLocalhost('127.0.0.1:27019')).to.be.true;
    });

    // Although 127.0.0.1 is usually used for localhost,
    // anything in the 127.0.0.1 -> 127.255.255.255 can be used.
    it('reports on localhost of type 127.x.x.x', () => {
      expect(isLocalhost('127.0.100.1:27019')).to.be.true;
      expect(isLocalhost('127.250.100.250:27019')).to.be.true;
      expect(isLocalhost('127.10.0.0:27019')).to.be.true;
    });

    // IPv6 loopback addresses.
    it('reports on localhost of type [::1]', () => {
      expect(isLocalhost('[::1]')).to.be.true;
      expect(isLocalhost('mongodb://[::1]/?readPreference=secondary')).to.be.true;
      expect(isLocalhost('[0000:0000:0000:0000:0000:0000:0000:0001]')).to.be.true;
      expect(isLocalhost('[0:0:0:0:0:0:0:1]')).to.be.true;
      expect(isLocalhost('[0::1]')).to.be.true;
      expect(isLocalhost('[::1]:27019')).to.be.true;
      expect(isLocalhost('[0:0:0:0:0:0:0:1]:27019')).to.be.true;
      expect(isLocalhost('[0::1]:27019')).to.be.true;
    });

    it('reports on localhost of type 0.0.0.0', () => {
      expect(isLocalhost('0.0.0.0:27019')).to.be.true;
    });

    it('works as url', () => {
      expect(isLocalhost('mongodb://127.0.0.1:27019')).to.be.true;
      expect(isLocalhost('mongodb+srv://127.0.0.1')).to.be.true;
      expect(isLocalhost('mongodb://0.0.0.0:27019')).to.be.true;
      expect(isLocalhost('mongodb+srv://0.0.0.0')).to.be.true;
      expect(isLocalhost('mongodb://localhost')).to.be.true;
      expect(isLocalhost('mongodb://localhost:27019')).to.be.true;
    });

    it('works as hostname', () => {
      expect(isLocalhost('127.0.0.1')).to.be.true;
      expect(isLocalhost('0.0.0.0')).to.be.true;
      expect(isLocalhost('localhost')).to.be.true;
    });

    it('does not report if localhost or 127.0.0.1 is not the hostname', () => {
      expect(isLocalhost('127.0.0.500')).to.be.false;
      expect(isLocalhost('128.0.0.2')).to.be.false;
      expect(isLocalhost('0.0.0.1')).to.be.false;
      expect(isLocalhost('remotehost')).to.be.false;
      expect(isLocalhost('mongodb://remotelocalhost')).to.be.false;
      expect(isLocalhost('[test:ipv6::1]')).to.be.false;
      expect(isLocalhost('[1:0:0:0:0:0:0:1]')).to.be.false;
      expect(isLocalhost('[test:ipv6::1]:27019')).to.be.false;
      expect(isLocalhost('[1:0:0:0:0:0:0:1]:27019')).to.be.false;
    });

    it('does not throw and returns with invalid argument', () => {
      expect(isLocalhost(123)).to.be.false;
      expect(isLocalhost('')).to.be.false;
      expect(isLocalhost({})).to.be.false;
      expect(isLocalhost(undefined)).to.be.false;
      expect(isLocalhost(null)).to.be.false;
    });
  });

  context('isDigitalOcean', () => {
    it('reports on digital ocean', () => {
      expect(isDigitalOcean('mongodb+srv://admin:catscatscats@dave-a1234321.mongo.ondigitalocean.com/test?authSource=admin&replicaSet=dave')).to.be.true;
    });

    it('works with hostname only', () => {
      expect(isDigitalOcean('dave-a1234321.mongo.ondigitalocean.com')).to.be.true;
    });

    it('works with host only', () => {
      expect(isDigitalOcean('dave-a1234321.mongo.ondigitalocean.com:27017')).to.be.true;
    });

    it('returns false if not digitalocean', () => {
      expect(isDigitalOcean('dave-a1234321.mongo.ondigitalocean.com2')).to.be.false;
      expect(isDigitalOcean('dave-a1234321mongo.ondigitalocean.com')).to.be.false;
      expect(isDigitalOcean('dave-a1234321.mongoxondigitalocean.com')).to.be.false;
    });

    it('does not throw and returns with invalid argument', () => {
      expect(isDigitalOcean(123)).to.be.false;
      expect(isDigitalOcean('')).to.be.false;
      expect(isDigitalOcean({})).to.be.false;
      expect(isDigitalOcean(undefined)).to.be.false;
      expect(isDigitalOcean(null)).to.be.false;
    });
  });

  context('isGenuineMongoDB', () => {
    it('reports on CosmosDB', () => {
      const isGenuine = getGenuineMongoDB(fixtures.COSMOSDB_BUILD_INFO, fixtures.CMD_LINE_OPTS);
      expect(isGenuine.isGenuine).to.be.false;
      expect(isGenuine.serverName).to.equal('cosmosdb');
    });

    it('reports on DocumentDB', () => {
      const isGenuine = getGenuineMongoDB(fixtures.BUILD_INFO_3_2, fixtures.DOCUMENTDB_CMD_LINE_OPTS);
      expect(isGenuine.isGenuine).to.be.false;
      expect(isGenuine.serverName).to.equal('documentdb');
    });

    it('does not report on 3.2', () => {
      const isGenuine = getGenuineMongoDB(fixtures.BUILD_INFO_3_2, fixtures.CMD_LINE_OPTS);
      expect(isGenuine.isGenuine).to.be.true;
      expect(isGenuine.serverName).to.equal('mongodb');
    });

    it('does not report on older versions', () => {
      const isGenuine = getGenuineMongoDB(fixtures.BUILD_INFO_OLD, fixtures.CMD_LINE_OPTS);
      expect(isGenuine.isGenuine).to.be.true;
      expect(isGenuine.serverName).to.equal('mongodb');
    });
  });
});
