import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './user-profile-button.css';

class UserProfileButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            profilePicUrl: null
        };
    }

    componentDidMount() {
        this.loadUserProfile();
    }

    // Helper to read a cookie by name
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
        return null;
    }

    loadUserProfile() {
        const username = this.getCookie('arkide_username');
        if (username) {
            this.setState({
                username: username,
                profilePicUrl: `https://arkideapi.arc360hub.com/api/v1/users/getpfp?username=${encodeURIComponent(username)}`
            });
        }
    }

    handleProfileClick = () => {
        if (this.state.username) {
            window.location.href = `/profile?user=${encodeURIComponent(this.state.username)}`;
        }
    }

    handleLoginClick = () => {
        window.location.href = 'https://arkide.site/login';
    }

    render() {
        const { username, profilePicUrl } = this.state;

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
        );
    }
}

UserProfileButton.propTypes = {};

export default UserProfileButton;
