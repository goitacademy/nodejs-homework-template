declare function blockedByDriverMetadata(apiDetails: string): {
    driverCaused: boolean;
    api: string;
};
declare enum ShellApiErrors {
    NotConnectedToShardedCluster = "SHAPI-10001",
    NotConnectedToReplicaSet = "SHAPI-10002",
    NotConnectedToMongos = "SHAPI-10003",
    NotConnected = "SHAPI-10004",
    NotUsingFLE = "SHAPI-10005"
}
export { blockedByDriverMetadata, ShellApiErrors };
