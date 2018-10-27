import React from 'react';
import * as Constants from './constants/Constants.js';
import SearchControls from './components/SearchControls.js';
import SearchResults from './components/SearchResults.js';
import ArtefactDetails from './components/ArtefactDetails.js';
import getData from './dataAccess/RemoteDataAccess.js';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSearchType: Constants.REQUEST_TYPE.COLLECTION_SEARCH,
      selectedSource: Constants.DEFAULT_SOURCE,
      selectedNumSearchResults: Constants.DEFAULT_NO_RESULTS_TO_SHOW,
      lastSearchSource : null,
      searchText: "",
      artefactId: null,
      testing: 'blah',
      singleArtefactDataRequestStatus: Constants.DATA_REQUEST_STATUS.NONE_MADE,
      singleArtefactRawData: [],
      singleArtefactProcessedData: [],
      singleArtefactMessage: null,
      searchResultsDataRequestStatus: Constants.DATA_REQUEST_STATUS.NONE_MADE,
      searchResultsRawData: [],
      searchResultsProcessedData: [],
      searchResultsErrorMessage: null,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  stateReset() {
    this.setState({
      selectedSearchType: Constants.REQUEST_TYPE.SINGLE_ARTEFACT,
      selectedSource: Constants.DEFAULT_SOURCE,
      selectedNumSearchResults: Constants.DEFAULT_NO_RESULTS_TO_SHOW,
      lastSearchSource : null,
      searchText: "",
      artefactId: null,
      testing: 'blah',
      singleArtefactDataRequestStatus: Constants.DATA_REQUEST_STATUS.NONE_MADE,
      singleArtefactRawData: [],
      singleArtefactProcessedData: [],
      singleArtefactErrorMessage: null,
      searchResultsDataRequestStatus: Constants.DATA_REQUEST_STATUS.NONE_MADE,
      searchResultsRawData: [],
      searchResultsProcessedData: [],
      searchResultsErrorMessage: null,
    });
  }

  requestData(searchType, selectedSource, searchText) {
    getData(searchType, selectedSource, searchText)
      .then(returnData => {
        var dataRequestStatus = searchType + 'DataRequestStatus';
        var errorMessage = searchType + 'ErrorMessage';
        var rawData = searchType + 'RawData';
        var processedData = searchType + 'ProcessedData';
        this.setState({
          [dataRequestStatus]: returnData[Constants.DATA_REQUEST_RESULT],
          [errorMessage]: returnData[Constants.DATA_REQUEST_ERROR],
          [rawData]: returnData[Constants.DATA_REQUEST_RAW_DATA],
          [processedData]: returnData[Constants.DATA_REQUEST_PROCESSED_DATA],
          lastSearchSource: selectedSource,
        });
      })
  }

  handleClick(event) {
    console.log('handleClick fired by: ' + event);
    console.log('handleClick fired by: ' + event.target);
    console.log('handleClick fired by: ' + event.target.id);
    console.log('handleClick fired by: ' + event.target.className);

    var category = (event.target.className === Constants.SEARCH_CELL || event.target.className === Constants.SEARCH_PREVIEW_IMAGE) ? event.target.className : event.target.id;
    category = event.target.className === Constants.ARTEFACT_PREVIEW_IMAGE ? event.target.className : category;
    
    switch (category) {
      case Constants.SEARCH_BUTTON:
        var dataRequestStatus = this.state.selectedSearchType + 'DataRequestStatus';
        var errorMessage = this.state.selectedSearchType + 'ErrorMessage';
        this.setState({
          [dataRequestStatus]: Constants.DATA_REQUEST_STATUS.LOADING,
          [errorMessage]: null,
          lastSearchSource: this.state.selectedSource,
          searchText: this.state.searchText.trim(),
        });
        this.requestData(this.state.selectedSearchType, this.state.selectedSource, this.state.searchText);
      break;

      case Constants.RESET_BUTTON:
        this.stateReset();
      break;

      case Constants.SEARCH_CELL:
      case Constants.SEARCH_PREVIEW_IMAGE:
        var artefact_id =  event.target.id.substring(event.target.id.indexOf(Constants.SEARCH_CELL)+Constants.SEARCH_CELL.length+1);
        console.log("worked! " + artefact_id);
        if (artefact_id !== this.state.artefactId) {
          this.setState({
            singleArtefactDataRequestStatus: Constants.DATA_REQUEST_STATUS.LOADING,
            singleArtefactErrorMessage: null,
            artefactId: artefact_id,
          });
          this.requestData(Constants.REQUEST_TYPE.SINGLE_ARTEFACT, this.state.lastSearchSource, artefact_id);
        } else {
          console.log("artefact " + artefact_id + " already displayed - so not reloading.");
        }
      break;
     
      case Constants.ARTEFACT_PREVIEW_IMAGE:
        console.log("image clicked! " + event.target.id);
        var tempData = this.state.singleArtefactProcessedData;
        tempData.objectPrimaryImageURL = event.target.src;
        this.setState({
          singleArtefactProcessedData: tempData,
        });
      break;

    default:
      break;
     }
  }
 
  handleChange(event) {
    switch (event.target.id) {
      case Constants.SEARCH_INPUTBOX:
        this.setState({
          searchText: event.target.value
        })
      break;
 
      case Constants.SEARCH_SOURCE_SELECT:
        this.setState({
          selectedSource: event.target.value
        });
      break;
 
      case Constants.SEARCH_RESULTS_NUMBER_SELECT:
        this.setState({
          selectedNumSearchResults: event.target.value
        });
      break;
 
      case Constants.REQUEST_TYPE.SINGLE_ARTEFACT:
      case Constants.REQUEST_TYPE.COLLECTION_SEARCH:
        {
            this.setState({
                selectedSearchType: event.target.id
            });
            break;
        }

      default:
      break;
    }
  }
 
  render() {
    return (
      <div className = "App">
        <div className = "App-header">
          <h2><img src = {logo} className = "App-logo" alt = "logo" />Museum Companion</h2>
        </div>
        <SearchControls selected_source={this.state.selectedSource} selected_search_type={this.state.selectedSearchType} search_text={this.state.searchText} onChange={this.handleChange} onClick={this.handleClick} />
        <div className="external-data">
          <SearchResults dataRequestStatus={this.state.searchResultsDataRequestStatus} searchData={this.state.searchResultsProcessedData} errorMessage={this.state.searchResultsErrorMessage} selectedNumSearchResults={this.state.selectedNumSearchResults} onChange={this.handleChange} onClick={this.handleClick} />
          <ArtefactDetails dataRequestStatus={this.state.singleArtefactDataRequestStatus} source={this.state.lastSearchSource} objectData={this.state.singleArtefactProcessedData} errorMessage={this.state.singleArtefactErrorMessage} onClick={this.handleClick}/>
        </div>
      </div>
    );
  }
}

export default App