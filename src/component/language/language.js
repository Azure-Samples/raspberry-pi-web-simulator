import React, { Component } from 'react';
import { traceEvent } from '../../lib/telemetry.js';
import './language.scss';
import Localization from '../../localization/localization';
import { Route } from 'react-router-dom';

class Language extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false
        };
    }

    onButtonClick = (e) => {
        e.stopPropagation();
        if(this.state.showList === false) {
            this.toggleShowList();
            document.body.addEventListener('mousedown',this.onBodyClick);
            this.listener = true;
        }
    }

    onBodyClick = () => {
        setTimeout(this.toggleShowList,100);
    }

    toggleShowList = () => {
        if(this.listener) {
            document.body.removeEventListener('mousedown',this.onBodyClick);
            this.listener = false;
        }
        this.setState((prev) => {
            return {
                showList: !prev.showList
            }
        });
    }

    onLanguageClick = (key, e) => {
        Localization.getLocalizedString().setLanguage(key);
        e.stopPropagation();
        this.props.reloadMain();
        this.props.history.push('?lang='+key);
        window.localStorage.setItem('lang', key);
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