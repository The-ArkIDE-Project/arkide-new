import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './user-profile-button.css';

class UserProfileButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            profilePicUrl: null,
            dropdownOpen: false
        };
        this.dropdownRef = React.createRef();
    }

    componentDidMount() {
        this.loadUserProfile();
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
            this.setState({ dropdownOpen: false });
        }
    }

    // Helper to read a cookie by name
    getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name)) {
                // Get everything after the cookie name
                const value = cookie.substring(name.length).trim();
                // Remove the first character (= or :) and any quotes
                return value.substring(1).replace(/^"|"$/g, '');
            }
        }
        return null;
    }

    loadUserProfile() {
        // const username = "ark"
        const username = this.getCookie('arkide_username');
        if (username) {
            // Update state so render shows profile instead of login
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
        window.open(url, "_blank");
        this.setState({ dropdownOpen: false });
    }

    handleLoginClick = () => {
        window.open('https://arkide.site/signin', "_blank");
    }

    render() {
        const { username, profilePicUrl, dropdownOpen } = this.state;

        if (!username) {
            // Show login button if not logged in
            return (
                <span
                    className={styles.outlinedButton}
                    role="button"
                    onClick={this.handleLoginClick}
                >
                    <div className={styles.content}>Login</div>
                </span>
            );
        }

        // Show user profile if logged in
        return (
            <div className={styles.dropdownContainer} ref={this.dropdownRef}>
                <span
                    className={styles.outlinedButton}
                    role="button"
                    onClick={this.handleProfileClick}
                >
                    <img
                        className={classNames(styles.icon, styles.userProfilePic)}
                        draggable={false}
                        src={profilePicUrl}
                        height="24"
                        width="24"
                        alt={username}
                    />
                    <div className={styles.content}>{username}</div>
                </span>

                {dropdownOpen && (
                    <div className={styles.dropdownMenu}>
                        <div 
                            className={styles.dropdownItem}
                            onClick={() => this.handleMenuItemClick(`https://arkide.site/profile/?user=${encodeURIComponent(username)}`)}
                        >
                            Go to Profile
                        </div>
                        <div 
                            className={styles.dropdownItem}
                            onClick={() => this.handleMenuItemClick('https://arkide.site/mystuff/')}
                        >
                            My Stuff
                        </div>
                        <div 
                            className={styles.dropdownItem}
                            onClick={() => this.handleMenuItemClick('https://arkide.site/settings/')}
                        >
                            Settings
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

UserProfileButton.propTypes = {};

export default UserProfileButton;