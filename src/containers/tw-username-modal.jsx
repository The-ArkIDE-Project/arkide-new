import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';
import {setUsername, setUsernameInvalid} from '../reducers/tw';
import UsernameModalComponent from '../components/tw-username-modal/username-modal.jsx';
import {closeUsernameModal} from '../reducers/modals';
import {generateRandomUsername} from '../lib/tw-username';
import isScratchDesktop from '../lib/isScratchDesktop';

class UsernameModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleKeyPress',
            'handleFocus',
            'handleOk',
            'handleCancel',
            'handleChange',
            'handleReset'
        ]);
        this.state = {
            value: this.props.username,
            valueValid: !this.props.usernameInvalid
        };
    }
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
        return null;
    }

    componentDidUpdate (prevProps) {
        if (prevProps.usernameLoggedIn !== this.props.usernameLoggedIn) {
            const cookieName = this.getCookie('arkide_username');
            this.setState({
                value: cookieName || this.props.username,
                valueValid: true
            });
        }
    }
    handleKeyPress (event) {
        if (this.props.usernameLoggedIn) return; // user is logged in
        if (event.key === 'Enter' && this.state.valueValid) {
            this.handleOk();
        }
    }
    handleFocus (event) {
        event.target.select();
    }
    handleOk () {
        if (this.props.usernameLoggedIn) return; // user is logged in
        const cookieName = this.getCookie('arkide_username');
        this.props.onSetUsername(cookieName || this.state.value);
        this.props.onCloseUsernameModal();
    }
    handleCancel () {
        this.props.onCloseUsernameModal();
    }
    handleChange (e) {
        if (this.props.usernameLoggedIn) return; // user is logged in
        this.setState({
            value: e.target.value,
            valueValid: e.target.checkValidity()
        });
    }
    handleReset () {
        if (this.props.usernameLoggedIn) return;

        const cookieName = this.getCookie('arkide_username');

        // If cookie missing → default to "player"
        const username = cookieName || 'player';

        this.props.onCloseUsernameModal();
        this.props.onSetUsername(username);
    }
    render () {
        return (
            <UsernameModalComponent
                mustChangeUsername={this.props.usernameInvalid}
                value={this.state.value}
                valueValid={this.state.valueValid}
                usernameLoggedIn={this.props.usernameLoggedIn}
                onKeyPress={this.handleKeyPress}
                onFocus={this.handleFocus}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                onChange={this.handleChange}
                onReset={this.handleReset}
            />
        );
    }
}

UsernameModal.propTypes = {
    onCloseUsernameModal: PropTypes.func,
    onSetUsername: PropTypes.func,
    username: PropTypes.string,
    usernameInvalid: PropTypes.bool,
    usernameLoggedIn: PropTypes.bool
};

const mapStateToProps = state => ({
    username: state.scratchGui.tw.username,
    usernameInvalid: state.scratchGui.tw.usernameInvalid,
    usernameLoggedIn: state.scratchGui.tw.usernameLoggedIn
});

const mapDispatchToProps = dispatch => ({
    onCloseUsernameModal: () => dispatch(closeUsernameModal()),
    onSetUsername: username => {
        dispatch(setUsername(username));
        dispatch(setUsernameInvalid(false));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsernameModal);
