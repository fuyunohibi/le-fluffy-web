import { IPlugin } from "./pluginsManager";

class RewardsPlugin implements IPlugin {
    initialize() {
        console.log("Rewards plugin initialized");
    }

    execute() {
        console.log("Preparing rewards");
    }
}

export default RewardsPlugin