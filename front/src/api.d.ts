export interface Api {
    call: (channel: string, ...args: any[]) => Promise<any>;
    onEngineMessage: (callback: (...params: any[]) => void) => void;
    onConfig: (callback: (...params: any[]) => void) => void;
    getPathForFile: (any) => string
}

declare global {
    interface Window {
        api: Api;
    }
}
