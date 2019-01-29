import React from 'react';
import ArtefactDetails from '../components/ArtefactDetails.js';
import * as Constants from '../constants/Constants.js';
import PropTypes from 'prop-types';

class ExhibitionBrowser extends React.Component {
	render() {
		return (
			<div className={Constants.DISPLAY_PAGE_WRAPPER}>
				<h1>Exhibition Browser</h1>
				<h2>Table of Exhibitions</h2>
				<TableOfExhibitions
					exhibitions_all_collections={this.props.exhibitions_all_collections}
					onClick={this.props.onClick}
				/>
				<ExhibitionSummary
					exibition_artefacts={this.props.exibition_artefacts}
					exibition_details={this.props.exibition_details}
					dataRequestStatus={this.props.singleArtefactDataRequestStatus}
					onClick={this.props.onClick}
				/>
				<ArtefactDetails
					dataRequestStatus={this.props.dataRequestStatus}
					source={this.props.source}
					objectData={this.props.objectData}
					errorMessage={this.props.errorMessage}
					onClick={this.props.handleClick}
				/>
			</div>
		);
	}
}

function TableOfExhibitions(props) {
	const rows = props.exhibitions_all_collections.map((collection, id) => {
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
	if (
		props.exibition_details &&
		props.exibition_details.hasOwnProperty('UniqueID')
	) {
		const rows = props.exibition_artefacts.map((collection, index) => {
			return (
				<ExhibitionTableRow
					key={collection.ArtefactSequence}
					collection={collection}
					index={index}
					onClick={props.onClick}
				/>
			);
		});
		return (
			<>
				<h2>Exhibition Details</h2>
				<h3>{props.exibition_details.Name}</h3>
				<p>{props.exibition_details.UniqueID}</p>
				<br />
				<p>{props.exibition_details.Description}</p>
				<br />
				<p>{props.exibition_details.Introduction}</p>
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
	} else {
		return null;
	}
}

function ExhibitionTableRow(props) {
	const imageAlt =
		'Image representing ' +
		props.collection.SourceCollection +
		'artefact ' +
		props.collection.ArtefactID;
	const cell_id =
		props.index +
		'_' +
		Constants.SEARCH_CELL +
		'_' +
		props.collection.ArtefactID;
	const institution_name = Constants.SOURCES[props.collection.SourceCollection];
	return (
		<tr onClick={props.onClick}>
			<td id={cell_id} className={Constants.EXHIBITION_CONTENTS_CELL}>
				<img
					className={Constants.SEARCH_PREVIEW_IMAGE}
					src={props.collection.PrimaryImageURL}
					alt={imageAlt}
				/>
			</td>
			<td id={cell_id} className={Constants.EXHIBITION_CONTENTS_CELL}>
				{props.collection.Name}
			</td>
			<td id={cell_id} className={Constants.EXHIBITION_CONTENTS_CELL}>
				{institution_name}, {props.collection.ArtefactID}
			</td>
			<td id={cell_id} className={Constants.EXHIBITION_CONTENTS_CELL}>
				{props.collection.Description}
			</td>
		</tr>
	);
}

export default ExhibitionBrowser;

ExhibitionBrowser.propTypes = {
	onClick: PropTypes.func.isRequired
};
