import React from 'react';
import * as Constants from '../constants/Constants.js';

class SearchResults extends React.Component {
	render() {
		var return_value = null;

		switch (this.props.dataRequestStatus) {
		case Constants.DATA_REQUEST_STATUS.NONE_MADE:
			return_value = null;
			break;

		case Constants.DATA_REQUEST_STATUS.LOADING:
			return_value = (
				<div className={Constants.DISPLAY_SEARCH_RESULTS_MESSAGE}>
					<p>Loading...</p>
				</div>
			);
			break;

		case Constants.DATA_REQUEST_STATUS.FAILURE:
			return_value = (
				<div className={Constants.DISPLAY_SEARCH_RESULTS_MESSAGE}>
					<p>{this.props.errorMessage}</p>
				</div>
			);
			break;

		case Constants.DATA_REQUEST_STATUS.SUCCESS:
			return_value = (
				<div className={Constants.DISPLAY_SEARCH_RESULTS}>
					<ResultsNavigation
						selectedNumSearchResults={this.props.selectedNumSearchResults}
						searchResultsStartRange={this.props.searchResultsStartRange}
						searchResultsEndRange={this.props.searchResultsEndRange}
						searchResultsTotalNumber={this.props.searchResultsTotalNumber}
						resultsLoaded={this.props.searchData.length}
						searchResultsBackgroundDataRequestStatus={
							this.props.searchResultsBackgroundDataRequestStatus
						}
						onChange={this.props.onChange}
						onClick={this.props.onClick}
					/>
					<table className={Constants.SEARCH_TABLE}>
						<tbody>
							<tr>
								<th className={Constants.SEARCH_TABLE_SUMMARY_COLUMN}>
										Summary
								</th>
								<th className={Constants.SEARCH_TABLE_IMAGE_COLUMN}>Image</th>
							</tr>

							{this.props.searchData
								.slice(
									this.props.searchResultsStartRange - 1,
									this.props.searchResultsEndRange
								)
								.map((searchResult, index) => {
									//var id_id = index + '_' + Constants.SEARCH_CELL + '_' + searchResult.objectID;
									//var id_name = index + '_' + Constants.SEARCH_CELL + '_' + searchResult.objectID;
									var id_summary =
											index +
											'_' +
											Constants.SEARCH_CELL +
											'_' +
											searchResult.objectID;
									var id_image_cell =
											index +
											'_' +
											Constants.SEARCH_CELL +
											'_' +
											searchResult.objectID;
									var id_image =
											index +
											'_i_' +
											Constants.SEARCH_CELL +
											'_' +
											searchResult.objectID;

									//<td id={id_id} className={Constants.SEARCH_CELL}>{searchResult.objectID}</td>
									//<td id={id_name} className={Constants.SEARCH_CELL}>{searchResult.objectName}</td>

									var image_block = null;
									if (searchResult.objectPrimaryImageURL !== null) {
										image_block = (
											<td
												id={id_image_cell}
												className={Constants.SEARCH_CELL}
											>
												<img
													id={id_image}
													src={searchResult.objectPrimaryImageURL}
													alt="Primary visual representation of artefact"
													className={Constants.SEARCH_PREVIEW_IMAGE}
												/>
											</td>
										);
									} else {
										image_block = (
											<td
												id={id_image_cell}
												className={Constants.SEARCH_CELL}
											>
												{Constants.MESSAGE_NO_IMAGE}
											</td>
										);
									}

									return (
										<tr key={index} onClick={this.props.onClick}>
											<td id={id_summary} className={Constants.SEARCH_CELL}>
												<span className={Constants.SEARCH_RESULT_NAME}>
													{searchResult.objectName}
												</span>
												<br />
												{searchResult.objectSummary}
												<br />
													ID: {searchResult.objectID}
											</td>
											{image_block}
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			);
			break;

		default:
			return_value = <p>This message should never be seen</p>;
			break;
		}

		return return_value;
	}
}

function ResultsNavigation(props) {
	var disablePrevious = !(parseInt(props.selectedNumSearchResults, 10) > 0);
	var disableNext = !(parseInt(props.selectedNumSearchResults, 10) > 0);
	if (props.searchResultsStartRange === 1) {
		disablePrevious = true;
	}
	if (
		props.searchResultsEndRange === props.searchResultsTotalNumber ||
		props.searchResultsEndRange > props.resultsLoaded
	) {
		disableNext = true;
	}
	var resultsLoadedMessage =
		props.searchResultsBackgroundDataRequestStatus ===
		Constants.DATA_REQUEST_STATUS.SUCCESS ? (
				<p>({props.resultsLoaded} results have been downloaded)</p>
			) : (
				<p>({props.resultsLoaded} results downloaded - fetching more)</p>
			);
	return (
		<div className={Constants.DISPLAY_SEARCH_RESULTS_NAV}>
			<button
				className="narrow_button"
				id={Constants.PREVIOUS_BUTTON}
				disabled={disablePrevious}
				onClick={props.onClick}
			>
				&lt; &lt; &lt;
			</button>
			<button
				className="narrow_button"
				id={Constants.NEXT_BUTTON}
				disabled={disableNext}
				onClick={props.onClick}
			>
				&gt; &gt; &gt;
			</button>
			<p>
				Results {props.searchResultsStartRange} to {props.searchResultsEndRange}{' '}
				of {props.searchResultsTotalNumber}. Show:{' '}
				<ResultsDisplayNumberOption
					value={props.selectedNumSearchResults}
					onChange={props.onChange}
				/>
			</p>
			{resultsLoadedMessage}
		</div>
	);
}

function ResultsDisplayNumberOption(props) {
	var options = [];
	var source_values = Object.keys(Constants.NO_OF_RESULTS_TO_SHOW);
	var source_descriptions = Object.values(Constants.NO_OF_RESULTS_TO_SHOW);

	for (var i = 0; i < source_values.length; i++) {
		options.push(
			<option key={source_values[i]} value={source_values[i]}>
				{source_descriptions[i]}
			</option>
		);
	}

	//console.log("default: " + props.value);
	return (
		<select
			id={Constants.SEARCH_RESULTS_NUMBER_SELECT}
			value={props.value}
			onChange={props.onChange}
		>
			{options}
		</select>
	);
}

export default SearchResults;
