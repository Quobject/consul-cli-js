export declare class Consul {
    private options;
    constructor(options?: IOptions);
    command(command: string, commandEnd?: string, callback?: (err: any, data: any) => void): Promise<any>;
}
export interface IOptions {
    httpAddr?: string;
    currentWorkingDirectory?: string;
    toParams(): string;
}
export declare class Options implements IOptions {
    httpAddr?: string;
    currentWorkingDirectory?: string;
    constructor(httpAddr?: string, currentWorkingDirectory?: string);
    toParams(): string;
}
