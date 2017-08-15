import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';

class Localization extends Component {
    static getLocalizedString() {
        if (!this.localizedString) {
            this.localizedString = new LocalizedStrings(Localization.localizedStringList);
        }
        return this.localizedString;
    }

    static getAllLanugages() {
        let result = new Map();
        for(let key of Object.keys(Localization.localizedStringList)) {
            result.set(key,Localization.localizedStringList[key]._displayName);
        }
        return result;
    }
};

Localization.localizedStringList = {
    "en": {
        _displayName: "English",
        pageTitle: "Raspberry Pi Azure IoT Online Simulator",
        pageTitleMobile: "Raspberry Pi Simulator",
        buttonRun: "Run",
        buttonStop: "Stop",
        buttonReset: "Reset",
        consoleWelcomeMessage: "Click `Run` button to run the sample code(When sample is running, code is read-only).\nClick `Stop` button to stop the sample code running.\nClick `Reset` to reset the code.We keep your changes to the editor even you refresh the page.",
        consoleSampleStopped: "Sample stopped",
        connectionStringMissing: "Connection string is empty or error, please click 'Help' on the top-right to get help",
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
    },
    "ja": {
        _displayName: "日本語",
        pageTitle: "Raspberry Pi Azure IoT Online Simulator",
        pageTitleMobile: "Raspberry Pi Simulator",
        buttonRun: "Run",
        buttonStop: "Stop",
        buttonReset: "Reset",
        consoleWelcomeMessage: "Click `Run` button to run the sample code(When sample is running, code is read-only).\nClick `Stop` button to stop the sample code running.\nClick `Reset` to reset the code.We keep your changes to the editor even you refresh the page.",
        consoleSampleStopped: "アプリケーションが停止しました",
        codeEditor: "コードエディタ",
        helpButton: "ヘルプ",
        helpStep: "Step",
        helpButtonBack: "前のステップ",
        helpButtonNext: "次のステップ",
        helpButtonGotIt: "私は理解して",
        helpLinkSeeDoc: "完全なチュートリアルを見る",
        helpLinkViewSource: "ソースコードを表示する",
        helpTitle1: "Raspberry Pi Web シミュレーターの概要",
        helpTitle2: "IoT Hub の作成",
        helpTitle3: "Pi Web シミュレーターでのサンプル アプリケーションの実行",
        helpContentAssemblyArea: "アセンブリ領域",
        helpContentCodingArea: "コーディング領域",
        helpContentConsoleArea: "統合コンソールウィンドウ",
        helpContentAssemblyAreaDescription: "あなたのデバイスの状態を見ることができます",
        helpContentCodingAreaDescription: "Node.jsでRaspberry Piのアプリを作るためのオンラインコードエディタ",
        helpContentConsoleAreaDescription: "アプリケーションの出力を見ることができます。",
        helpContentInThe: "",
        helpContentClick: "で",
        helpContentAdd: "追加",
        helpContentAzurePortal: "Azure portal",
        helpContentClickCapitalize: "",
        helpContentPane: "ペイン",
        helpContent1: "[新規] > [モノのインターネット (IoT)] > [IoT Hub]",
        helpContent2: "の順にクリックします",
        helpContent3: "デバイス エクスプローラー",
        helpContent4: "ウィンドウで [追加] をクリックして、デバイスを IoT Hub に追加します。",
        helpContent5: "作成したばかりのデバイスを選択し、",
        helpContent6: "接続文字列の主キーをコピーします。",
        helpContent7: "",
        helpContent8: "ライン15",
        helpContent9: "のプレースホルダをAzure IoTハブデバイスの",
        helpContent10: "接続文字列に置き換えます。",
        helpContent11: "[Run] をクリックまたは npm start と入力してアプリケーションを実行します。",
        altRaspberryPiLogo: "Raspberry Pi logo"
    },
    "zh-cn": {
        _displayName: "简体中文",
        pageTitle: "Raspberry Pi Azure IoT Online Simulator",
        pageTitleMobile: "Raspberry Pi Simulator",
        buttonRun: "运行",
        buttonStop: "停止",
        buttonReset: "重置",
        consoleWelcomeMessage: "单击'运行'按钮运行示例代码（示例运行时代码为只读）\ n单击'停止'按钮停止运行示例代码。\ n单击'重置'以重置代码。即使刷新页面，我们也会保留对编辑器的更改。",
        consoleSampleStopped: "示例停止",
        codeEditor: "代码编辑器",
        helpButton: "帮助",
        helpStep: "步骤",
        helpButtonBack: "上一步",
        helpButtonNext: "下一步",
        helpButtonGotIt: "完成",
        helpLinkSeeDoc: "查看完整教程",
        helpLinkViewSource: "访问源代码",
        helpTitle1: "Raspberry Pi Web 模拟器概述",
        helpTitle2: "创建 IoT 中心并记下连接字符串的主密钥",
        helpTitle3: "在 Pi Web 模拟器上运行示例应用程序",
        helpContentAssemblyArea: "组装区",
        helpContentCodingArea: "编码区域",
        helpContentConsoleArea: "集成控制台窗口",
        helpContentAssemblyAreaDescription: "你可以看到设备状态",
        helpContentCodingAreaDescription: "一个联机代码编辑器，可在其中使用 Raspberry Pi 进行编码",
        helpContentConsoleAreaDescription: "显示代码输出",
        helpContentInThe: "在",
        helpContentClick: "点击",
        helpContentAdd: "添加",
        helpContentAzurePortal: "Azure 门户",
        helpContentClickCapitalize: "点击",
        helpContentPane: "窗格",
        helpContent1: "“新建” > “物联网” > “IoT 中心”",
        helpContent2: "以创建一个Azure IoT中心",
        helpContent3: "设备资源管理器",
        helpContent4: "在你的Azure IoT中心创建一个设备",
        helpContent5: "选择刚刚创建的设备并记下",
        helpContent6: "连接字符串的主密钥",
        helpContent7: "替换占位符",
        helpContent8: "在第15行",
        helpContent9: "替换的内容是Azure IoT中心内",
        helpContent10: "设备连接字符串",
        helpContent11: "按钮或者输入 \"npm start\" 以运行应用程序",
        altRaspberryPiLogo: "Raspberry Pi logo"
    },
    "zh-tw": {
        _displayName: "繁体中文",
        pageTitle: "Raspberry Pi Azure IoT Online Simulator",
        pageTitleMobile: "Raspberry Pi Simulator",
        buttonRun: "執行",
        buttonStop: "停止",
        buttonReset: "重設",
        consoleWelcomeMessage: "單擊“運行”按鈕運行示例代碼（示例運行時，代碼為只讀）\ n單擊“停止”按鈕停止運行示例代碼。\ n單擊“復位”以重置代碼。 即使刷新頁面，我們也會保留對編輯器的更改。",
        consoleSampleStopped: "應用停止",
        codeEditor: "代碼編輯器",
        helpButton: "幫助",
        helpStep: "步驟",
        helpButtonBack: "上一步",
        helpButtonNext: "下一步",
        helpButtonGotIt: "知道了",
        helpLinkSeeDoc: "看完整的教程",
        helpLinkViewSource: "查看源代碼",
        helpTitle1: "Raspberry Pi模擬器概述",
        helpTitle2: "準備Azure IoT集線器並獲取設備連接字符串",
        helpTitle3: "在Pi網頁模擬器上運行示例應用程序",
        helpContentAssemblyArea: "裝配區",
        helpContentCodingArea: "編碼區",
        helpContentConsoleArea: "集成控制台窗口",
        helpContentAssemblyAreaDescription: "您可以看到您的設備狀態",
        helpContentCodingAreaDescription: "一個在線代碼編輯器，您可以使用Node.js在Raspberry Pi上製作一個應用程序",
        helpContentConsoleAreaDescription: "您可以看到應用的輸出",
        helpContentInThe: "在",
        helpContentClick: "單擊",
        helpContentAdd: "添加",
        helpContentAzurePortal: "Azure portal",
        helpContentClickCapitalize: "單擊",
        helpContentPane: "窗格",
        helpContent1: "[新增] > [物聯網] > [IoT 中樞]",
        helpContent2: "以添加新的IoT中樞",
        helpContent3: "設備瀏覽器",
        helpContent4: "將設備添加到您的IoT中樞",
        helpContent5: "選擇剛剛創建的設備並複制",
        helpContent6: "連接字串的主索引鍵",
        helpContent7: "將",
        helpContent8: "第15行的佔位符",
        helpContent9: "替換為",
        helpContent10: "連接字串的主索引鍵",
        helpContent11: "按鈕或在控制台窗口中鍵入“npm start”來運行應用程序",
        altRaspberryPiLogo: "Raspberry Pi logo"
    },
    "es": {
        _displayName: "Español",
        pageTitle: "Raspberry Pi Azure IoT Online Simulator",
        pageTitleMobile: "Raspberry Pi Simulator",
        buttonRun: "Run",
        buttonStop: "Stop",
        buttonReset: "Reset",
        consoleWelcomeMessage: "Haga clic en el botón 'Run' para ejecutar el código de ejemplo (cuando el ejemplo está en ejecución, el código es de sólo lectura). \nHaga clic en el botón 'Stop' para detener el código de ejemplo en ejecución. \nHaga clic en 'Reset' para restablecer el código. Mantenemos sus cambios en el editor aunque actualice la página.",
        consoleSampleStopped: "Aplicación detenida",
        codeEditor: "Editor de código",
        helpButton: "Ayuda",
        helpStep: "Paso",
        helpButtonBack: "Anterior",
        helpButtonNext: "El siguiente paso",
        helpButtonGotIt: "Entender",
        helpLinkSeeDoc: "Ver tutorial completo",
        helpLinkViewSource: "Ver código fuente",
        helpTitle1: "Introducción al simulador web de Raspberry Pi",
        helpTitle2: "Crear un centro de IoT",
        helpTitle3: "Ejecute la aplicación en el área de codificación.",
        helpContentAssemblyArea: "Área de ensamblaje",
        helpContentCodingArea: "Área de codificación",
        helpContentConsoleArea: "Ventana de consola integrada",
        helpContentAssemblyAreaDescription: "You can see your device status",
        helpContentCodingAreaDescription: "An online code editor for you to make an app on Raspberry Pi with Node.js",
        helpContentConsoleAreaDescription: "You can see the output of your app",
        helpContentInThe: "En",
        helpContentClick: "haga clic en",
        helpContentAdd: "Añadir",
        helpContentAzurePortal: "Azure portal",
        helpContentClickCapitalize: "Haga clic en",
        helpContentPane: "pane",
        helpContent1: "Nuevo > Internet de las cosas > IoT Hub",
        helpContent2: "para crear un IoT Hub",
        helpContent3: "Explorador de dispositivos",
        helpContent4: "haga clic en Agregar para agregar un dispositivo a su centro de IoT",
        helpContent5: "Seleccione el dispositivo que acaba de crear,",
        helpContent6: "Anote la clave principal de la cadena de la cadena de conexión",
        helpContent7: "Reemplace el marcador de posición de la",
        helpContent8: "línea 15",
        helpContent9: "con la cadena de conexión del dispositivo de Azure IoT Hub.",
        helpContent10: "cadena de la cadena de conexión",
        helpContent11: "Haga clic en Ejecutar o escriba \"npm start\" para ejecutar la aplicación",
        altRaspberryPiLogo: "Raspberry Pi logo"
    }
};

export default Localization;