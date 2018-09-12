import React from 'react';
import * as Constants from '../constants/Constants.js';

class SearchControls extends React.Component {
    render() {
        return (
            //<React.Fragment>
            <div className = "Search-controls">
                <SourceOption value={this.props.selected_source} onChange={this.props.onChange} />
                <SearchInputbox onChange={this.props.onChange} />
                <SearchButton onClick={this.props.onClick} />
            </div>
            //</React.Fragment>
        );
    }
}

class SourceOption extends React.Component {
    //const source_values = Object.keys(Constants.SOURCES);
    //const source_descriptions = Object.keys(Constants.SOURCE_DESCRIPTIONS);
    //const options = source_values.map((source_value) =>
    //      <option key={source_value.toString()} value={source_value.toString()}>{source_value}</option>
    //);

    render() {
        var options = [];
        var source_values = Object.values(Constants.SOURCES);
        var source_descriptions = Object.values(Constants.SOURCE_DESCRIPTIONS);

        for (var i = 0; i < source_values.length; i++) {
            options.push(<option key={source_values[i]} value={source_values[i]}>{source_descriptions[i]}</option>);
        }

        return (
            <select id={Constants.SEARCH_SOURCE_SELECT} value={this.props.value} onChange={this.props.onChange}>
                {options}
            </select>
        );
    }
}

function SearchInputbox(props) {
    return (
        <input type="text" id={Constants.SEARCH_INPUTBOX} onChange={props.onChange} />
    );
}

function SearchButton(props) {
    return (
        <button className="button" id={Constants.SEARCH_BUTTON} onClick={props.onClick}>Load Artefact</button>
    );
}

export default SearchControls