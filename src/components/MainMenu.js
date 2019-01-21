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
					selected={
						this.props.display_page === Constants.PAGES.ARTEFACT_SEARCH
							? true
							: false
					}
					onClick={this.props.onClick}
				/>
				<MenuTab
					id={Constants.EXHIBITION_BUTTON}
					label="Exhibition Browser"
					selected={
						this.props.display_page === Constants.PAGES.EXHIBITION_BROWSER
							? true
							: false
					}
					onClick={this.props.onClick}
				/>
				<MenuTab
					id={Constants.USER_MANAGEMENT_BUTTON}
					label="User Profile"
					selected={
						this.props.display_page === Constants.PAGES.USER_MANAGEMENT
							? true
							: false
					}
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
	display_page: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};
