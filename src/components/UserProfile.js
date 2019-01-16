import React from 'react';
import * as Constants from '../constants/Constants.js';
import PropTypes from 'prop-types';

class UserProfile extends React.Component {
	render() {
		const user_management_fields = {
			user_management_selector: this.props.user_management_selector,
			user_management_username: this.props.user_management_username,
			user_management_email: this.props.user_management_email,
			user_management_first_name: this.props.user_management_first_name,
			user_management_surname: this.props.user_management_surname,
			user_management_password: this.props.user_management_password,
			user_management_passwordconf: this.props.user_management_passwordconf,
			user_management_new_username: this.props.user_management_new_username,
			user_management_new_email: this.props.user_management_new_email,
			user_management_new_first_name: this.props.user_management_new_first_name,
			user_management_new_surname: this.props.user_management_new_surname,
			user_management_new_password: this.props.user_management_new_password,
			user_management_new_passwordconf: this.props
				.user_management_new_passwordconf
		};
		const user_message_is_positive =
			this.props.user_status === Constants.USER_STATUS.LOGGED_IN ||
			this.props.user_status === Constants.USER_STATUS.LOGGED_OUT
				? true
				: false;

		//<p>TEMP: LOGIN STATUS: {this.props.user_status}</p>
		//<p>TEMP: INTERNAL DATA: {this.props.status_message}</p>
		return (
			<div className={Constants.DISPLAY_PAGE_WRAPPER}>
				<h1>User Profile</h1>

				<UserStatusMessage
					user_status={this.props.user_status}
					user_status_loading={this.props.user_status_loading}
					user_message_is_positive={user_message_is_positive}
					status_message={this.props.status_message}
				/>

				{this.props.user_status === Constants.USER_STATUS.LOGGED_IN ? (
					<UserProfileContent
						onClick={this.props.onClick}
						{...user_management_fields}
					/>
				) : null}

				{this.props.user_status === Constants.USER_STATUS.EDITING_PROFILE ? (
					<ProfileUpdate
						onClick={this.props.onClick}
						onChange={this.props.onChange}
						{...user_management_fields}
					/>
				) : null}

				{this.props.user_status !== Constants.USER_STATUS.LOGGED_IN &&
				this.props.user_status !== Constants.USER_STATUS.EDITING_PROFILE ? (
						<LoginAndRegistrationFieldsContent
							onClick={this.props.onClick}
							onChange={this.props.onChange}
							{...user_management_fields}
						/>
					) : null}
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
		//props.user_status === Constants.USER_STATUS.REQUEST_PENDING ||
		props.user_status === Constants.USER_STATUS.EDITING_PROFILE
	) {
		return null;
	} else if (props.user_status_loading === true) {
		return <p>LOADING</p>;
	} else {
		const message_class =
			'display_user_status_good_' + props.user_message_is_positive;
		return (
			<p className={message_class}>
				<span className={Constants.DISPLAY_INFORMATION_SYMBOL}>ⓘ</span>{' '}
				{props.status_message}
			</p>
		);
	}
}

function UserProfileContent(props) {
	return (
		<div className={Constants.FORM_CONTENT}>
			<p>
				<span>Username:</span> {props.user_management_username}
			</p>
			<p>
				<span>Email:</span> {props.user_management_email}
			</p>
			<p>
				<span>First Name:</span> {props.user_management_first_name}
			</p>
			<p>
				<span>Surname:</span> {props.user_management_surname}
			</p>
			<p>
				<span>Password:</span> *********** (To change your password click "Edit
				Profile")
			</p>
			<div>
				<input
					type="button"
					className={Constants.DISPLAY_LINK_BUTTON_SMALL}
					id={Constants.PROFILE_EDIT_BUTTON}
					value="Edit Profile"
					onClick={props.onClick}
				/>
				<input
					type="button"
					className={Constants.DISPLAY_LINK_BUTTON_SMALL}
					id={Constants.LOGOUT_BUTTON}
					value="Logout"
					onClick={props.onClick}
				/>
			</div>
		</div>
	);
}

function LoginAndRegistrationFieldsContent(props) {
	return (
		<div className={Constants.FORM_CONTENT}>
			<h2>
				<input
					type="button"
					className={Constants.DISPLAY_LINK_BUTTON_LARGE}
					id={Constants.SELECTOR_LOGIN}
					onClick={props.onClick}
					value="Login"
				/>{' '}
				or{' '}
				<input
					type="button"
					className={Constants.DISPLAY_LINK_BUTTON_LARGE}
					id={Constants.SELECTOR_REGISTER}
					onClick={props.onClick}
					value="Register"
				/>
			</h2>{' '}
			{props.user_management_selector === Constants.SELECTOR_REGISTER ? (
				<div>
					<div>
						<span>Username: </span>
						<input
							type="text"
							id={Constants.INPUT_TEXT_USERNAME}
							onChange={props.onChange}
							value={props.user_management_username}
						/>
					</div>
					<div>
						<span>First Name: </span>
						<input
							type="text"
							id={Constants.INPUT_TEXT_FIRST_NAME}
							onChange={props.onChange}
							value={props.user_management_first_name}
						/>
					</div>
					<div>
						<span>Surname: </span>
						<input
							type="text"
							id={Constants.INPUT_TEXT_SURNAME}
							onChange={props.onChange}
							value={props.user_management_surname}
						/>
					</div>
				</div>
			) : null}
			{props.user_management_selector !== Constants.SELECTOR_NONE ? (
				<div>
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
				</div>
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
		</div>
	);
}

function LoginOrRegisterButton(props) {
	return (
		<div>
			<input
				type="button"
				className={Constants.DISPLAY_LINK_BUTTON_SMALL}
				id={props.id}
				value={props.value}
				onClick={props.onClick}
			/>
		</div>
	);
}

function ProfileUpdate(props) {
	return (
		<div className={Constants.FORM_CONTENT}>
			<p>
				<span>Username: </span>
				<input
					type="text"
					id={Constants.INPUT_TEXT_NEW_USERNAME}
					onChange={props.onChange}
					value={props.user_management_new_username}
				/>
			</p>

			<p>
				<span>Email:</span>
				<input
					type="text"
					id={Constants.INPUT_TEXT_NEW_EMAIL}
					onChange={props.onChange}
					value={props.user_management_new_email}
				/>
			</p>
			<p>
				<span>First Name:</span>
				<input
					type="text"
					id={Constants.INPUT_TEXT_NEW_FIRST_NAME}
					onChange={props.onChange}
					value={props.user_management_new_first_name}
				/>
			</p>
			<p>
				<span>Surname:</span>
				<input
					type="text"
					id={Constants.INPUT_TEXT_NEW_SURNAME}
					onChange={props.onChange}
					value={props.user_management_new_surname}
				/>
			</p>
			<p>
				<span>Password:</span>
				<input
					type="text"
					id={Constants.INPUT_TEXT_NEW_PASSWORD}
					onChange={props.onChange}
					onClick={props.onClick}
					value={props.user_management_new_password}
				/>
			</p>
			<p>
				<span>Confirm Password:</span>
				<input
					type="text"
					id={Constants.INPUT_TEXT_NEW_PASSWORDCONF}
					onChange={props.onChange}
					onClick={props.onClick}
					value={props.user_management_new_passwordconf}
				/>
			</p>

			<div>
				<input
					type="button"
					className={Constants.DISPLAY_LINK_BUTTON_SMALL}
					id={Constants.PROFILE_EDIT_SAVE_BUTTON}
					value="Save Changes"
					onClick={props.onClick}
				/>
				<input
					type="button"
					className={Constants.DISPLAY_LINK_BUTTON_SMALL}
					id={Constants.PROFILE_EDIT_CANCEL_BUTTON}
					value="Cancel"
					onClick={props.onClick}
				/>
			</div>
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
	user_management_first_name: PropTypes.string.isRequired,
	user_management_surname: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
};
