import React from 'react';
import * as Constants from '../constants/Constants.js';
import PropTypes from 'prop-types';

class ExhibitionBuilder extends React.Component {
	render() {
		return (
			<div>
				<h1>Exhibition Builder</h1>
				<p>To be implemented...</p>
				<p>Payload: {JSON.stringify(this.props.internal_data)}</p>
			</div>
		);
	}
}

export default ExhibitionBuilder;

ExhibitionBuilder.propTypes = {
	display_artefact_search: PropTypes.bool.isRequired,
	display_exhibition_builder: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
};
