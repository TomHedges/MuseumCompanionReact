import React from 'react';
import * as Constants from '../constants/Constants.js';
import PropTypes from 'prop-types';

class MainMenu extends React.Component {
	render() {
		return (
			<div className={Constants.DISPLAY_TAB_WRAPPER}>
				<input
					type="button"
					className={
						this.props.display_artefact_search
							? Constants.DISPLAY_TAB_SELECTED
							: Constants.DISPLAY_TAB
					}
					id={Constants.ARTEFACTS_BUTTON}
					value="Artefact Search"
					onClick={this.props.onClick}
					disabled={this.props.display_artefact_search}
				/>
				<input
					type="button"
					className={
						this.props.display_exhibition_builder
							? Constants.DISPLAY_TAB_SELECTED
							: Constants.DISPLAY_TAB
					}
					id={Constants.EXHIBITION_BUTTON}
					value="Exhibition Builder"
					onClick={this.props.onClick}
					disabled={this.props.display_exhibition_builder}
				/>
				<div className={Constants.DISPLAY_TAB_FILLER} />
			</div>
		);
	}
}

export default MainMenu;

MainMenu.propTypes = {
	display_artefact_search: PropTypes.bool.isRequired,
	display_exhibition_builder: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
};
