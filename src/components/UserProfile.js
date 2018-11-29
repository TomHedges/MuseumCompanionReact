import React from 'react';
import * as Constants from '../constants/Constants.js';
import PropTypes from 'prop-types';

class UserProfile extends React.Component {
	render() {
		return (
			<div>
				<h1>User Profile</h1>
				<p>To be implemented...</p>
			</div>
		);
	}
}

export default UserProfile;

UserProfile.propTypes = {
	display_artefact_search: PropTypes.bool.isRequired,
	display_exhibition_builder: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
};
