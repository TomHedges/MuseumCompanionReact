import React from 'react';
import * as Constants from '../constants/Constants.js';
import PropTypes from 'prop-types';

class ExhibitionBuilder extends React.Component {
	render() {
		return (
			<div className={Constants.DISPLAY_PAGE_WRAPPER}>
				<h1>Exhibition Builder</h1>
				<p>To be implemented...</p>
				<p>Payload: {JSON.stringify(this.props.internal_data)}</p>
				<p
					id={Constants.EXHIBITION_FIND_ALL_BUTTON}
					onClick={this.props.onClick}
				>
					TEST FIRE
				</p>
				<h2>Table of Exhibitions</h2>
				<TableOfExhibitions
					artefact_all_collections={this.props.artefact_all_collections}
				/>
			</div>
		);
	}
}

function TableOfExhibitions(props) {
	const rows = props.artefact_all_collections.map(collection => {
		return <TableRow key={collection.UniqueID} collection={collection} />;
	});
	return (
		<table>
			<tbody>
				<tr>
					<th>UniqueID</th>
					<th>Name</th>
					<th>Description</th>
				</tr>
				<tr>
					<td>test 1</td>
					<td>test 2</td>
					<td>test 3</td>
				</tr>
				{rows}
			</tbody>
		</table>
	);
}

function TableRow(props) {
	return (
		<tr>
			<td>{props.collection.UniqueID}</td>
			<td>{props.collection.Name}</td>
			<td>{props.collection.Description}</td>
		</tr>
	);
}

export default ExhibitionBuilder;

ExhibitionBuilder.propTypes = {
	onClick: PropTypes.func.isRequired
};
