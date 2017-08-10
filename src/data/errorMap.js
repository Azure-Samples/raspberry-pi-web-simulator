import Localization from '../localization/localization';
class ErrorMap {
    static generateMap() {
        return new Map([
            ['The connection string is missing the property: HostName',Localization.getLocalizedString().connectionStringMissing]
        ]);
    }

    static getInstance() {
        if(!this.instance) {
            this.instance = this.generateMap();
        }
        return this.instance;
    }
}

export default ErrorMap;