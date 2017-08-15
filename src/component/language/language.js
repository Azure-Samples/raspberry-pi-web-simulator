import React, { Component } from 'react';
import { traceEvent } from '../../lib/telemetry.js';
import './language.scss';
import Localization from '../../localization/localization';

class Language extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false
        };
    }

    onButtonClick = (e) => {
        this.setState((prev) => {
            return {
                showList: !prev.showList
            }
        });
    }

    onLanguageClick = (key, e) => {
        Localization.getLocalizedString().setLanguage(key);
        this.setState((prev) => {
            return {
                showList: !prev.showList
            }
        });
        e.stopPropagation();
        this.props.reloadMain();
    }

    render() {
        let languageElements = [];
        for (let [key, value] of Localization.getAllLanugages()) {
            languageElements.push(<span onClick={this.onLanguageClick.bind(this, key)} key={key}>{value}</span>);
        }
        return (
            <span className="language" onClick={this.onButtonClick}>
                {Localization.getAllLanugages().get(Localization.getLocalizedString().getLanguage())}
                <span className="arrow">▼</span>
                <div className={`language-list ${this.state.showList ? "display-show" : ""}`} >
                    {languageElements}
                </div>
            </span>
        );
    }
}

export default Language;