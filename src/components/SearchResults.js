import React from 'react';
import * as Constants from '../constants/Constants.js';

class SearchResults extends React.Component {
    render () {
      var return_value = null;

      switch (this.props.dataRequestStatus) {
        case Constants.DATA_REQUEST_STATUS.NONE_MADE:   
          return_value = null;
        break;

        case Constants.DATA_REQUEST_STATUS.LOADING:   
          return_value = <p>Loading...</p>;
        break;

        case Constants.DATA_REQUEST_STATUS.FAILURE:
          return_value = <p>Error: {this.props.errorMessage}</p>
        break;

        case Constants.DATA_REQUEST_STATUS.SUCCESS:
          return_value = (
            <React.Fragment>

            <ResultsNavigation selectedNumSearchResults={this.props.selectedNumSearchResults} onChange={this.props.onChange} onClick={this.props.onClick}/>

            <table>
              <tbody>
                <tr>
                  <th>Artefact ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Summary</th>
                </tr>

                {this.props.searchData.map((searchResult, index ) => {
                  var id_id = index + '_' + Constants.SEARCH_CELL + '_' + searchResult.objectID;
                  var id_name = index + '_' + Constants.SEARCH_CELL + '_' + searchResult.objectID;
                  var id_summary = index + '_' + Constants.SEARCH_CELL + '_' + searchResult.objectID;
                  var id_image_cell = index + '_' + Constants.SEARCH_CELL + '_' + searchResult.objectID;
                  var id_image = index + '_i_' + Constants.SEARCH_CELL + '_' + searchResult.objectID;

                  return (
                    <tr key={index} onClick={this.props.onClick}>
                      <td id={id_id} className={Constants.SEARCH_CELL}>{searchResult.objectID}</td>
                      <td id={id_name} className={Constants.SEARCH_CELL}>{searchResult.objectName}</td>
                      <td id={id_summary} className={Constants.SEARCH_CELL}>{searchResult.objectSummary}</td>
                      <td id={id_image_cell} className={Constants.SEARCH_CELL}><img id={id_image}src={searchResult.objectPrimaryImageURL} alt='Primary visual representation of artefact' className={Constants.SEARCH_PREVIEW_IMAGE}/></td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
            </React.Fragment>
          );
        break;

        default:
          return_value = <p>Error: This message should never be seen</p>
        break;
      }

      return (
        return_value
      );
    }
  }

  function ResultsNavigation(props) {
      return (
        <div>
          <button className="button" id={Constants.PREVIOUS_BUTTON} onClick={props.onClick}>Previous Page</button>
          <ResultsDisplayNumberOption value={props.selectedNumSearchResults} onChange={props.onChange}/>
          <span>Results x to y of z</span>
          <button className="button" id={Constants.NEXT_BUTTON} onClick={props.onClick}>Next Page</button>
        </div>
      );
  }

  function ResultsDisplayNumberOption(props) {
      var options = [];
      var source_values = Object.keys(Constants.NO_RESULTS_TO_SHOW);
      var source_descriptions = Object.values(Constants.NO_RESULTS_TO_SHOW);

      for (var i = 0; i < source_values.length; i++) {
          options.push(<option key={source_values[i]} value={source_values[i]}>{source_descriptions[i]}</option>);
      }

      console.log("default: " + props.value);
      return (
          <select id={Constants.SEARCH_RESULTS_NUMBER_SELECT} value={props.value} onChange={props.onChange}>
              {options}
          </select>
      );
  }

  export default SearchResults