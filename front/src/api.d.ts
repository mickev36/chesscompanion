export interface Api {
    call: (channel: string, ...args: any[]) => Promise<any>;
}

declare global {
    interface Window {
        api: Api;
    }
}
