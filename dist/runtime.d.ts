import BaseEcho from 'laravel-echo';
import { Context } from '@nuxt/types';

declare type EchoOptions = Record<string, any>;
interface ModuleOptions extends EchoOptions {
    broadcaster?: string;
    encrypted?: boolean;
    plugins?: string[];
    authModule?: boolean;
    connectOnLogin?: boolean;
    disconnectOnLogout?: boolean;
    optionsPath?: string;
    onBeforeConnect?: Function;
    onAfterConnect?: Function;
    onBeforeDisconnect?: Function;
    onAfterDisconnect?: Function;
}

declare class Echo extends BaseEcho {
    ctx: Context;
    constructor(ctx: Context, options?: Partial<ModuleOptions>);
    init(): Promise<void>;
    getHeaders(): Promise<any>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    watchAuthState(): void;
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $echo: Echo;
    }
    interface Context {
        $echo: Echo;
    }
    interface NuxtConfig {
        echo?: Partial<ModuleOptions>;
    }
    interface Configuration {
        echo?: Partial<ModuleOptions>;
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        $echo: Echo;
    }
}
declare module 'vuex/types/index' {
    interface Store<S> {
        $echo: Echo;
    }
}

export { Echo };
