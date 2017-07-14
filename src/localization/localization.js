import LocalizedStrings from 'react-localization';

class Localization {
    static getLocalizedString() {
        if (!this.localizedString) {
            this.localizedString = new LocalizedStrings(Localization.localizedStringList);
        }
        return this.localizedString;
    }
};

Localization.localizedStringList = {
    en: {
        pageTitle: "Raspberry Pi Azure IoT Online Simulator",
        pageTitleMobile: "Raspberry Pi Simulator",
        buttonRun: "Run",
        buttonStop: "Stop",
        buttonReset: "Reset",
        consoleWelcomeMessage: "Click `Run` button to run the sample code(When sample is running, code is read-only).\nClick `Stop` button to stop the sample code running.\nClick `Reset` to reset the code.We keep your changes to the editor even you refresh the page.",
        consoleSampleStopped: "Sample stopped",
        codeEditor: "Code Editor",
        helpButton: "Help",
        helpStep: "Step",
        helpButtonBack: "Back",
        helpButtonNext: "Next",
        helpButtonGotIt: "Got it",
        helpLinkSeeDoc: "See doc",
        helpLinkViewSource: "View source",
        helpTitle1: "Overview of Raspberry Pi Simulator",
        helpTitle2: "Prepare an Azure IoT hub and get the device connection string",
        helpTitle3: "Run the sample app on Pi web simulator",
        helpContentAssemblyArea: "Assembly Area",
        helpContentCodingArea: "Coding Area",
        helpContentConsoleArea: "Integrated console window",
        helpContentAssemblyAreaDescription: "You can see your device status",
        helpContentCodingAreaDescription: "An online code editor for you to make an app on Raspberry Pi with Node.js",
        helpContentConsoleAreaDescription: "You can see the output of your app",
        helpContentInThe: "In the",
        helpContentClick: "click",
        helpContentAdd: "Add",
        helpContentAzurePortal: "Azure portal",
        helpContentClickCapitalize: "Click",
        helpContentPane: "pane",
        helpContent1: "New > Internet of Things > IoT Hub",
        helpContent2: "to provision a new IoT hub",
        helpContent3: "Device Explorer",
        helpContent4: "to add a device to your IoT hub",
        helpContent5: "Select the device you just created and copy the",
        helpContent6: "primary key of the connection string",
        helpContent7: "Replace the placeholder in",
        helpContent8: "Line 15",
        helpContent9: "with the Azure IoT hub",
        helpContent10: "device connection string",
        helpContent11: "button or type \"npm start\" in the console window to run the application",
        altRaspberryPiLogo: "Raspberry Pi logo"
    }
};

export default Localization;