import React from 'react';
import darkModeCSS from '!raw-loader!./tw-theme-dark.css';

const THEME_KEY = 'tw:theme';
const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

export const getInitialDarkMode = () => {
    return true; // Always return true to force dark mode
};

const darkModeStylesheet = document.createElement('style');
darkModeStylesheet.textContent = darkModeCSS;

const ThemeHOC = function (WrappedComponent) {
    class ThemeComponent extends React.Component {
        constructor (props) {
            super(props);
            this.handleQueryChange = this.handleQueryChange.bind(this);
            this.handleClickTheme = this.handleClickTheme.bind(this);
            this.state = {
                dark: true // Force dark mode
            };
        }
        componentDidMount () {
            // media query does not have listeners in legacy edge
            if (darkMediaQuery.addEventListener) {
                darkMediaQuery.addEventListener('change', this.handleQueryChange);
            }
            this.updateDark();
        }
        componentDidUpdate () {
            try {
                localStorage.setItem(THEME_KEY, 'dark'); // Always save as dark
            } catch (e) {
                // ignore
            }
            this.updateDark();
        }
        componentWillUnmount () {
            // media query does not have listeners in legacy edge
            if (darkMediaQuery.removeEventListener) {
                darkMediaQuery.removeEventListener('change', this.handleQueryChange);
            }
        }
        updateDark () {
            const dark = true; // Force dark mode
            document.body.setAttribute('theme', 'dark');
            if (!darkModeStylesheet.parentNode) {
                // Append at the start of <body> we override scratch-gui styles in <head>
                // but are overridden by addon styles at the end of <body>
                document.body.insertBefore(darkModeStylesheet, document.body.firstChild);
            }
        }
        handleQueryChange () {
            // Do nothing - keep dark mode
        }
        handleClickTheme () {
            // Do nothing - prevent theme switching
        }
        render () {
            return (
                <WrappedComponent
                    onClickTheme={this.handleClickTheme}
                    isDark={true} // Always pass true
                    {...this.props}
                />
            );
        }
    }
    return ThemeComponent;
};

export {
    ThemeHOC as default
};