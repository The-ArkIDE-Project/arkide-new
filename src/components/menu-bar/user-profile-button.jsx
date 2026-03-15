import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './menu-bar.css';

import MenuBarMenu from './menu-bar-menu.jsx';
import {MenuItem} from '../menu/menu.jsx';

class UserProfileButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            profilePicUrl: null,
            dropdownOpen: false
        };
    }

    componentDidMount() {
        this.loadUserProfile();
    }

    getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name)) {
                const value = cookie.substring(name.length).trim();
                return value.substring(1).replace(/^"|"$/g, '');
            }
        }
        return null;
    }

    loadUserProfile() {
        // const username = "ark"
        const username = this.getCookie('arkide_username');
        if (username) {
            this.setState({
                username: username,
                profilePicUrl: `https://arkideapi.arc360hub.com/api/v1/users/getpfp?username=${encodeURIComponent(username)}`
            });
        } else {
            console.log('No arkide_username cookie found');
        }
    }

    handleProfileClick = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    handleMenuItemClick = (url) => {
        window.open(url, '_blank');
        this.setState({dropdownOpen: false});
    }

    handleLoginClick = () => {
        window.open('https://arkide.site/signin', '_blank');
    }

    render() {
        const {username, profilePicUrl, dropdownOpen} = this.state;

        if (!username) {
            return (
                <div
                    className={classNames(styles.menuBarItem, styles.hoverable)}
                    onMouseUp={this.handleLoginClick}
                >
                    <div>Login</div>
                </div>
            );
        }

        return (
            <div
                className={classNames(styles.menuBarItem, styles.hoverable, {
                    [styles.active]: dropdownOpen
                })}
                onMouseUp={this.handleProfileClick}
            >
                <img
                    src={profilePicUrl}
                    height="40"
                    width="40"
                    draggable={false}
                    style={{borderRadius: '20%', marginRight: '8px'}}
                    alt={username}
                />
                <div style={{fontSize: '14px'}}>{username}</div>
                <MenuBarMenu
                    className={classNames(styles.menuBarMenu)}
                    open={dropdownOpen}
                    place="left"
                    onRequestClose={() => this.setState({dropdownOpen: false})}
                >
                    <MenuItem
                        onClick={() => this.handleMenuItemClick(
                            `https://arkide.site/profile/?user=${encodeURIComponent(username)}`
                        )}
                    >
                        Go to Profile
                    </MenuItem>
                    <MenuItem
                        onClick={() => this.handleMenuItemClick('https://arkide.site/mystuff/')}
                    >
                        My Stuff
                    </MenuItem>
                    <MenuItem
                        onClick={() => this.handleMenuItemClick('https://arkide.site/settings/')}
                    >
                        Settings
                    </MenuItem>
                </MenuBarMenu>
            </div>
        );
    }
}

UserProfileButton.propTypes = {};

export default UserProfileButton;