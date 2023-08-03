export interface Api {
    call: (channel: string, ...args: any[]) => Promise<any>;
    onEngineMessage: (callback: (...params: any[]) => void) => void;
    onSettings: (callback: (...params: any[]) => void) => void;
}

declare global {
    interface Window {
        api: Api;
    }
}
