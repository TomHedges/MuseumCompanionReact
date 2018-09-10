import React from 'react';
import * as Constants from './constants/Constants.js';
import ArtefactDetails from './components/ArtefactDetails.js';
import getData from './dataAccess/RemoteDataAccess.js';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSource: Constants.SOURCES.V_AND_A,
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
    //alert('test constant structure: ' + Object.keys(Constants.SOURCES).length);
    switch (event.target.id) {
      case Constants.SEARCH_BUTTON:
        if (this.state.objectID) {
          this.setState({
            dataRequestStatus: Constants.DATA_REQUEST_STATUS.LOADING,
            errorMessage: null,
            lastSearchSource: this.state.selectedSource,
          });
          //this.buildUrl();
          getData(Constants.REQUEST_TYPE.SINGLE_ARTEFACT, this.state.selectedSource, this.state.objectID)
            .then(tempArray => {
              this.setState({
                dataRequestStatus: tempArray[0],
                objectData: tempArray[1],
                errorMessage: tempArray[2],
                lastSearchSource: this.state.selectedSource,
              });

              /*
              if (tempArray[0] === Constants.DATA_REQUEST_STATUS.SUCCESS) {
                  this.setState({
                    dataRequestStatus: tempArray[0],
                    objectData: tempArray[1],
                  });
                } else if (tempArray[0] === Constants.DATA_REQUEST_STATUS.FAILURE) {
                  this.setState({
                    dataRequestStatus: tempArray[0],
                    errorMessage: tempArray[1],
                  });
                }
                */
              }
            )
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

  /*
  buildUrl() {
    let finalURL = null;

    switch (this.state.selectedSource) {
      case Constants.SOURCES.V_AND_A:
      finalURL = Constants.V_AND_A.URL_ARTEFACT_ROOT + this.state.objectID
      break;

      case Constants.SOURCES.BRITISH_MUSEUM:
      finalURL = Constants.BRITISH_MUSEUM.URL_ARTEFACT_ROOT + this.state.objectID + "/root"
      break;

      case Constants.SOURCES.OTHER:
      finalURL = "https://otherurl.com/" + this.state.objectID
      break;

      default:
      break;
    }

    this.returnData(finalURL);
  }

  returnData(url) {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            dataRequestStatus: Constants.DATA_REQUEST_STATUS.SUCCESS,
            objectData: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            dataRequestStatus: Constants.DATA_REQUEST_STATUS.FAILURE,
            errorMessage: error.message,
          });
        }
      )
  }
  */

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
        <div className = "Search-Controls">
          <select id={Constants.SEARCH_SOURCE_SELECT} value={this.state.selectedSource} onChange={this.handleChange}>
            <option value={Constants.SOURCES.V_AND_A}>V&A Museum</option>
            <option value={Constants.SOURCES.BRITISH_MUSEUM}>British Museum</option>
            <option value={Constants.SOURCES.OTHER}>Other</option>
          </select>
          <input type="text" id={Constants.SEARCH_INPUTBOX} onChange={this.handleChange} />
          <button className="button" id={Constants.SEARCH_BUTTON} onClick={this.handleClick}>Load Artefact</button>
        </div>
      </div>
      <div className="external-data">
        <ArtefactDetails dataRequestStatus={this.state.dataRequestStatus} source={this.state.lastSearchSource} objectData={this.state.objectData} errorMessage={this.state.errorMessage}/>
      </div>
    </div>);
    }
  }

export default App