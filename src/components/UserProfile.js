import React from 'react';
import * as Constants from '../constants/Constants.js';
import PropTypes from 'prop-types';

class UserProfile extends React.Component {
	render() {
		const user_management_fields = {
			user_management_selector: this.props.user_management_selector,
			user_management_username: this.props.user_management_username,
			user_management_email: this.props.user_management_email,
			user_management_password: this.props.user_management_password,
			user_management_passwordconf: this.props.user_management_passwordconf
		};
		const user_message_is_positive =
			this.props.user_status === Constants.USER_STATUS.LOGGED_IN ||
			this.props.user_status === Constants.USER_STATUS.LOGGED_OUT
				? true
				: false;

		//<p>TEMP: LOGIN STATUS: {this.props.user_status}</p>
		//<p>TEMP: INTERNAL DATA: {this.props.status_message}</p>
		return (
			<div>
				<h1>User Profile</h1>
				<UserStatusMessage
					user_status={this.props.user_status}
					user_message_is_positive={user_message_is_positive}
					status_message={this.props.status_message}
				/>
				{this.props.user_status === Constants.USER_STATUS.LOGGED_IN ? (
					<UserProfileContent
						username={this.props.user_management_username}
						onClick={this.props.onClick}
					/>
				) : (
					<LoginAndRegistrationFieldsContent
						onClick={this.props.onClick}
						onChange={this.props.onChange}
						{...user_management_fields}
					/>
				)}
			</div>
		);
	}
}

function UserStatusMessage(props) {
	if (
		props.user_message_is_positive === null ||
		props.status_message === null ||
		props.status_message === '' ||
		props.user_status === null ||
		props.user_status === Constants.USER_STATUS.REQUEST_PENDING
	) {
		return null;
	} else {
		const message_class =
			'display_user_status_good_' + props.user_message_is_positive;
		return (
			<p className={message_class}>
				<span className="display_information_symbol">ⓘ</span>{' '}
				{props.status_message}
			</p>
		);
	}
}

function UserProfileContent(props) {
	return (
		<>
			<h2>User Profile</h2>
			<h3>Username: {props.username}</h3>
			<div>
				<input
					type="button"
					id={Constants.LOGOUT_BUTTON}
					value="Logout"
					onClick={props.onClick}
				/>
			</div>
		</>
	);
}

function LoginAndRegistrationFieldsContent(props) {
	return (
		<>
			<h2>
				<input
					type="button"
					className="button_as_link"
					id={Constants.SELECTOR_LOGIN}
					onClick={props.onClick}
					value="Login"
				/>{' '}
				or{' '}
				<input
					type="button"
					className="button_as_link"
					id={Constants.SELECTOR_REGISTER}
					onClick={props.onClick}
					value="Register"
				/>
			</h2>{' '}
			{props.user_management_selector === Constants.SELECTOR_REGISTER ? (
				<div>
					<span>Username: </span>
					<input
						type="text"
						id={Constants.INPUT_TEXT_USERNAME}
						onChange={props.onChange}
						value={props.user_management_username}
					/>
				</div>
			) : null}
			{props.user_management_selector !== Constants.SELECTOR_NONE ? (
				<>
					<div>
						<span>Email Address: </span>
						<input
							type="text"
							id={Constants.INPUT_TEXT_EMAIL}
							onChange={props.onChange}
							value={props.user_management_email}
						/>
					</div>
					<div>
						<span>Password: </span>
						<input
							type="text"
							id={Constants.INPUT_TEXT_PASSWORD}
							onChange={props.onChange}
							value={props.user_management_password}
						/>
					</div>
				</>
			) : null}
			{props.user_management_selector === Constants.SELECTOR_REGISTER ? (
				<div>
					<span>Confirm Password: </span>
					<input
						type="text"
						id={Constants.INPUT_TEXT_PASSWORDCONF}
						onChange={props.onChange}
						value={props.user_management_passwordconf}
					/>
				</div>
			) : null}
			{props.user_management_selector === Constants.SELECTOR_LOGIN ? (
				<LoginOrRegisterButton
					id={Constants.LOGIN_BUTTON}
					value="Login"
					onClick={props.onClick}
				/>
			) : props.user_management_selector === Constants.SELECTOR_REGISTER ? (
				<LoginOrRegisterButton
					id={Constants.REGISTER_BUTTON}
					value="Register"
					onClick={props.onClick}
				/>
			) : null}
		</>
	);
}

function LoginOrRegisterButton(props) {
	return (
		<div>
			<input
				type="button"
				id={props.id}
				value={props.value}
				onClick={props.onClick}
			/>
		</div>
	);
}

export default UserProfile;

UserProfile.propTypes = {
	user_status: PropTypes.string.isRequired,
	status_message: PropTypes.string.isRequired,
	user_management_selector: PropTypes.string.isRequired,
	user_management_username: PropTypes.string.isRequired,
	user_management_email: PropTypes.string.isRequired,
	user_management_password: PropTypes.string.isRequired,
	user_management_passwordconf: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
};
