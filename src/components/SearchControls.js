import React from 'react';
import * as Constants from '../constants/Constants.js';

class SearchControls extends React.Component {
	render() {
		return (
			//<React.Fragment>
			<div className={Constants.DISPLAY_SEARCH_CONTROLS}>
				<form onSubmit={this.props.onClick}>
					<div className={Constants.DISPLAY_SEARCH_CONTROLS_GROUP}>
						<SearchType
							selected_search_type={this.props.selected_search_type}
							onChange={this.props.onChange}
						/>
						<SourceOption
							value={this.props.selected_source}
							onChange={this.props.onChange}
						/>
					</div>
					<div className={Constants.DISPLAY_SEARCH_CONTROLS_GROUP}>
						<SearchInputbox
							onChange={this.props.onChange}
							search_text={this.props.search_text}
						/>
						<SearchButton
							onClick={this.props.onClick}
							disabled={!this.props.search_text}
							selected_search_type={this.props.selected_search_type}
						/>
						<ResetButton onClick={this.props.onClick} />
					</div>
					<div className="clearfix" />
				</form>
			</div>
			//</React.Fragment>
		);
	}
}

function SearchType(props) {
	return (
		<div className={Constants.DISPLAY_SEARCH_CONTROLS_SUBGROUP}>
			<span className={Constants.DISPLAY_CONTROL_LABEL}>Search type:</span>
			<label>
				<input
					id={Constants.REQUEST_TYPE.COLLECTION_SEARCH}
					type="radio"
					value={Constants.REQUEST_TYPE.COLLECTION_SEARCH}
					onChange={props.onChange}
					checked={
						props.selected_search_type ===
						Constants.REQUEST_TYPE.COLLECTION_SEARCH
					}
				/>
				Collection Search
			</label>
			<label>
				<input
					id={Constants.REQUEST_TYPE.SINGLE_ARTEFACT}
					type="radio"
					value={Constants.REQUEST_TYPE.SINGLE_ARTEFACT}
					onChange={props.onChange}
					checked={
						props.selected_search_type ===
						Constants.REQUEST_TYPE.SINGLE_ARTEFACT
					}
				/>
				Single Artefact
			</label>
		</div>
	);
}

class SourceOption extends React.Component {
	//const source_values = Object.keys(Constants.SOURCES);
	//const source_descriptions = Object.keys(Constants.SOURCE_DESCRIPTIONS);
	//const options = source_values.map((source_value) =>
	//      <option key={source_value.toString()} value={source_value.toString()}>{source_value}</option>
	//);

	render() {
		var options = [];
		var source_values = Object.keys(Constants.SOURCES);
		var source_descriptions = Object.values(Constants.SOURCES);

		for (var i = 0; i < source_values.length; i++) {
			options.push(
				<option key={source_values[i]} value={source_values[i]}>
					{source_descriptions[i]}
				</option>
			);
		}

		return (
			<div className={Constants.DISPLAY_SEARCH_CONTROLS_SUBGROUP}>
				<span className={Constants.DISPLAY_CONTROL_LABEL}>Institution: </span>
				<select
					id={Constants.SEARCH_SOURCE_SELECT}
					value={this.props.value}
					onChange={this.props.onChange}
				>
					{options}
				</select>
			</div>
		);
	}
}

function SearchInputbox(props) {
	return (
		<div className={Constants.DISPLAY_SEARCH_CONTROLS_SUBGROUP}>
			<span className={Constants.DISPLAY_CONTROL_LABEL}>Search Term: </span>
			<input
				type="text"
				id={Constants.SEARCH_INPUTBOX}
				onChange={props.onChange}
				value={props.search_text}
				autoFocus={true}
			/>
		</div>
	);
}

function SearchButton(props) {
	var label = props.disabled
		? 'Enter a search term'
		: props.selected_search_type === Constants.REQUEST_TYPE.SINGLE_ARTEFACT
			? 'Load Artefact'
			: 'Search Collection';
	return (
		<input
			type="button"
			className="button"
			id={Constants.SEARCH_BUTTON}
			disabled={props.disabled}
			onClick={props.onClick}
			value={label}
		/>
	);
}

function ResetButton(props) {
	return (
		<input
			type="button"
			className="button"
			id={Constants.RESET_BUTTON}
			onClick={props.onClick}
			value="Reset"
		/>
	);
}

export default SearchControls;
