import React from 'react';
import * as Constants from '../constants/Constants.js';
import PropTypes from 'prop-types';

class MainMenu extends React.Component {
	render() {
		return (
			<div className={Constants.DISPLAY_TAB_WRAPPER}>
				<MenuTab
					id={Constants.ARTEFACTS_BUTTON}
					label="Artefact Search"
					selected={this.props.display_artefact_search}
					onClick={this.props.onClick}
				/>
				<MenuTab
					id={Constants.EXHIBITION_BUTTON}
					label="Exhibition Builder"
					selected={this.props.display_exhibition_builder}
					onClick={this.props.onClick}
				/>
				<MenuTab
					id={Constants.USER_PROFILE_BUTTON}
					label="User Profile"
					selected={this.props.display_user_management}
					onClick={this.props.onClick}
				/>
				<div className={Constants.DISPLAY_TAB_FILLER} />
			</div>
		);
	}
}

function MenuTab(props) {
	return (
		<input
			type="button"
			className={
				props.selected ? Constants.DISPLAY_TAB_SELECTED : Constants.DISPLAY_TAB
			}
			id={props.id}
			value={props.label}
			onClick={props.onClick}
			disabled={props.selected}
		/>
	);
}

export default MainMenu;

MainMenu.propTypes = {
	display_artefact_search: PropTypes.bool.isRequired,
	display_exhibition_builder: PropTypes.bool.isRequired,
	display_user_management: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
};
