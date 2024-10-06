export interface IPlugin {
    initialize(): void;
    execute(): void;
}

class PluginManager {
    private static instance: PluginManager;
    private plugins: IPlugin[] = [];

    private constructor() { }

    public static getInstance(): PluginManager {
        if (!PluginManager.instance) {
            PluginManager.instance = new PluginManager();
        }
        return PluginManager.instance;
    }

    public register(plugin: IPlugin) {
        this.plugins.push(plugin);
        plugin.initialize();
    }

    public executeAll() {
        this.plugins.forEach(plugin => plugin.execute());
    }
}

// declare global {
//     const pluginManager: PluginManager | undefined;
// }

// // Initialize the pluginManager as a singleton
// const pluginManager = global.pluginManager || PluginManager.getInstance();

// // Ensure singleton in development mode
// if (process.env.NODE_ENV === 'development') {
//     global.pluginManager = pluginManager;
// }

export default PluginManager;