import { IPlugin } from "./pluginsManager";

class LocationPlugin implements IPlugin {
    initialize() {
        console.log("Location plugin initialized");
    }

    execute() {
        console.log("Fetching location data");
    }
}

export default LocationPlugin