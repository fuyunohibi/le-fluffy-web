import { IPlugin } from "./pluginsManager";

class AdsPlugin implements IPlugin {
    initialize() {
        console.log("Ads plugin initialized");
    }

    execute() {
        console.log("Displaying ads");
        // logic for fetching and displaying ads
    }
}

export default AdsPlugin