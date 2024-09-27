export declare function getDataLake(buildInfo: any): {
  isDataLake: boolean;
  dlVersion: string;
};

export declare function isEnterprise(buildInfo: any): boolean;
export declare function isAtlas(uri: string): boolean;
export declare function isLocalhost(uri: string): boolean;
export declare function isDigitalOcean(uri: string): boolean;

export declare function getGenuineMongoDB(buildInfo: any, cmdLineOpts: any): {
  isGenuine: boolean;
  serverName: string;
};

export declare function getBuildEnv(buildInfo: any): {
  serverOs: string;
  serverArch: string;
};
