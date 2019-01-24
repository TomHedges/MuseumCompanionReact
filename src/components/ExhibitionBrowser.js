import React from 'react';
import * as Constants from '../constants/Constants.js';
import PropTypes from 'prop-types';

class ExhibitionBrowser extends React.Component {
	render() {
		return (
			<div className={Constants.DISPLAY_PAGE_WRAPPER}>
				<h1>Exhibition Browser</h1>
				<h2>Table of Exhibitions</h2>
				<TableOfExhibitions
					artefact_all_collections={this.props.artefact_all_collections}
					onClick={this.props.onClick}
				/>
				<h2>Exhibition Details</h2>
				<ExhibitionSummary
					exibition_artefacts={this.props.exibition_artefacts}
					onClick={this.props.onClick}
				/>
			</div>
		);
	}
}

function TableOfExhibitions(props) {
	const rows = props.artefact_all_collections.map((collection, id) => {
		return (
			<AllExhibitionsTableRow
				key={collection.UniqueID}
				collection={collection}
				onClick={props.onClick}
				rowID={id}
			/>
		);
	});
	return (
		<table>
			<tbody>
				<tr>
					<th>UniqueID</th>
					<th>Name</th>
					<th>Description</th>
				</tr>
				{rows}
			</tbody>
		</table>
	);
}

function AllExhibitionsTableRow(props) {
	var id_summary =
		props.rowID +
		'_' +
		Constants.EXHIBITION_LIST_CELL +
		'_' +
		props.collection._id;
	return (
		<tr onClick={props.onClick}>
			<td id={id_summary} className={Constants.EXHIBITION_LIST_CELL}>
				{props.collection.UniqueID}
			</td>
			<td id={id_summary} className={Constants.EXHIBITION_LIST_CELL}>
				{props.collection.Name}
			</td>
			<td id={id_summary} className={Constants.EXHIBITION_LIST_CELL}>
				{props.collection.Description}
			</td>
		</tr>
	);
}

function ExhibitionSummary(props) {
	const rows = props.exibition_artefacts.map(collection => {
		return (
			<ExhibitionTableRow
				key={collection.ArtefactSequence}
				collection={collection}
			/>
		);
	});
	return (
		<>
			<h3>Name</h3>
			<p>UniqueID</p>
			<br />
			<p>Description</p>
			<br />
			<p>Introduction</p>
			<br />
			<table>
				<tbody>
					<tr>
						<th>Image</th>
						<th>Name</th>
						<th>Origin</th>
						<th>Description</th>
					</tr>
					{rows}
				</tbody>
			</table>
		</>
	);
}

function ExhibitionTableRow(props) {
	const imageAlt =
		'Image representing ' +
		props.collection.SourceCollection +
		'artefact ' +
		props.collection.ArtefactID;
	return (
		<tr>
			<td id="" className={Constants.EXHIBITION_LIST_CELL}>
				<img
					className={Constants.SEARCH_PREVIEW_IMAGE}
					src={props.collection.PrimaryImageURL}
					alt={imageAlt}
				/>
			</td>
			<td id="" className={Constants.EXHIBITION_LIST_CELL}>
				{props.collection.Name}
			</td>
			<td id="" className={Constants.EXHIBITION_LIST_CELL}>
				{props.collection.SourceCollection}, {props.collection.ArtefactID}
			</td>
			<td id="" className={Constants.EXHIBITION_LIST_CELL}>
				{props.collection.Description}
			</td>
		</tr>
	);
}

export default ExhibitionBrowser;

ExhibitionBrowser.propTypes = {
	onClick: PropTypes.func.isRequired
};
