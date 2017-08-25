import React, { Component } from 'react';
import { traceEvent } from '../../lib/telemetry.js';
import './language.scss';
import Localization from '../../localization/localization';
import { browserHistory } from 'react-router';

class Language extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showList: false
        };
    }

    componentDidMount() {
        this.refs.languageButton.addEventListener('mousedown',this.onButtonClick);
    }

    componentWillUnmount() {
        this.refs.languageButton.removeEventListener('mousedown',this.onButtonClick);
    }

    onButtonClick = (e) => {
        if(this.state.showList === false) {
            this.toggleShowList();
            document.body.addEventListener('mousedown',this.onBodyClick);
            e.stopPropagation();
            this.listener = true;
        }
    }

    onBodyClick = (e) => {
        this.toggleShowList();
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
        let location = Object.assign({},
            browserHistory.getCurrentLocation());
        Object.assign(location.query, {
            lang: key,
        });
        browserHistory.push(location);
        window.localStorage.setItem('lang', key);
    }

    render() {
        let languageElements = [];
        for (let [key, value] of Localization.getAllLanugages()) {
            languageElements.push(<span onClick={this.onLanguageClick.bind(this, key)} key={key}>{value}</span>);
        }
        return (
            <span className="language" ref="languageButton">
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