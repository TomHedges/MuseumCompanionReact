import React from 'react';
import * as Constants from './constants/Constants.js';
import ArtefactDetails from './components/ArtefactDetails.js';
import SearchControls from './components/SearchControls.js';
import getData from './dataAccess/RemoteDataAccess.js';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSource: Constants.DEFAULT_SOURCE,
      lastSearchSource : null,
      dataRequestStatus: Constants.DATA_REQUEST_STATUS.NONE_MADE,
      objectData: [],
      objectID: null,
      errorMessage: null,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    switch (event.target.id) {
      case Constants.SEARCH_BUTTON:
        if (this.state.objectID) {
          this.setState({
            dataRequestStatus: Constants.DATA_REQUEST_STATUS.LOADING,
            errorMessage: null,
            lastSearchSource: this.state.selectedSource,
          });
          getData(Constants.REQUEST_TYPE.SINGLE_ARTEFACT, this.state.selectedSource, this.state.objectID)
            .then(tempArray => {
              this.setState({
                dataRequestStatus: tempArray[0],
                objectData: tempArray[1],
                errorMessage: tempArray[2],
                lastSearchSource: this.state.selectedSource,
              });
            })
        } //else there is no search term, so no action. In future, have button disabled until there is a term.
      break;

      default:
      break;
    }
  }

  handleChange(event) {
    switch (event.target.id) {
      case Constants.SEARCH_INPUTBOX:
        this.setState({
          objectID: event.target.value
        })
      break;

      case Constants.SEARCH_SOURCE_SELECT:
        this.setState({
          selectedSource: event.target.value
        });
      break;

      default:
      break;
    }
  }

  render() {
    return (
      <div className = "App">
        <div className = "App-header">
          <img src = {logo} className = "App-logo" alt = "logo" />
        <h2>Museum Companion</h2>
      </div>
      <div className = "controls">
        <p className = "App-intro" >
          Search for an object by ID! eg. O61949 or O234
        </p>
        <SearchControls selected_source={this.state.selectedSource} onChange={this.handleChange} onClick={this.handleClick}/>
      </div>
      <div className="external-data">
        <ArtefactDetails dataRequestStatus={this.state.dataRequestStatus} source={this.state.lastSearchSource} objectData={this.state.objectData} errorMessage={this.state.errorMessage}/>
      </div>
    </div>);
    }
  }

export default App