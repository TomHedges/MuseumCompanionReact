import React from 'react';
import * as Constants from './components/constants/Constants.js';
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
    switch (event.target.id) {
      case Constants.SEARCH_BUTTON:
        if (this.state.objectID) {
          this.setState({
            dataRequestStatus: Constants.DATA_REQUEST_STATUS.LOADING,
            errorMessage: null,
            lastSearchSource: this.state.selectedSource,
          });
          this.buildUrl();
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
        <select id={Constants.SEARCH_SOURCE_SELECT} value={this.state.selectedSource} onChange={this.handleChange}>
          <option value={Constants.SOURCES.V_AND_A}>V&A Museum</option>
          <option value={Constants.SOURCES.BRITISH_MUSEUM}>British Museum</option>
          <option value={Constants.SOURCES.OTHER}>Other</option>
        </select>
        <input type="text" id={Constants.SEARCH_INPUTBOX} onChange={this.handleChange} />
        <button className="button" id={Constants.SEARCH_BUTTON} onClick={this.handleClick}>Load Artefact</button>
      </div>
      <div className="external-data">
        <ArtefactDetails dataRequestStatus={this.state.dataRequestStatus} source={this.state.lastSearchSource} objectData={this.state.objectData} errorMessage={this.state.errorMessage}/>
      </div>
    </div>);
    }
  }

  class ArtefactDetails extends React.Component {
    getFields() {
      let fields = {
        objectName: null,
        objectSlug: 'Slug still to be set up...',
        objectPrimaryImageURL: null,
        objectText: 'Text still to be set up...',
      }

      if (this.props.dataRequestStatus === Constants.DATA_REQUEST_STATUS.SUCCESS) {
        switch (this.props.source) {
          case Constants.SOURCES.V_AND_A:
            fields.objectName = (!this.props.objectData[0].fields.title) ? "Unknown" : this.props.objectData[0].fields.title;
            if (this.props.objectData[0].fields.primary_image_id) {
              fields.objectPrimaryImageURL = 'http://media.vam.ac.uk/media/thira/collection_images/' + this.props.objectData[0].fields.primary_image_id.substring(0, 6) + '/' + this.props.objectData[0].fields.primary_image_id + '.jpg'
            };
          break;

          case Constants.SOURCES.BRITISH_MUSEUM:
          break;

          case Constants.SOURCES.OTHER:
          break;

          default:
          break;
        }
      }

      return fields;
    }

    render () {
      let fields = this.getFields();
      let objectName = fields.objectName;
      let objectSlug = fields.objectSlug;
      let objectPrimaryImageURL = fields.objectPrimaryImageURL;
      let objectText = fields.objectText;

      let return_value = null;

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
          return_value = (<div>
              <ArtefactName objectName={objectName} />
              <ArtefactSlug objectSlug={objectSlug}/>
              <ArtefactPrimaryImage objectPrimaryImageURL={objectPrimaryImageURL}/>
              <ArtefactText objectText={objectText}/>
          </div>);
        break;

        default:
          return_value = <p>Error: This message should never be seen</p>
        break;
      }

      return return_value;
    }
  }

  class ArtefactName extends React.Component {
    render () {
      return (
        <h2>Name: {this.props.objectName}</h2>
      );
    }
  }

  class ArtefactSlug extends React.Component {
    render () {
      return (
        <p>ArtefactSlug: {this.props.objectSlug}</p>
      );
    }
  }

  class ArtefactPrimaryImage extends React.Component {
    render () {
      if (this.props.objectPrimaryImageURL) {
        return <img src={this.props.objectPrimaryImageURL} alt='Primary visual representation of artefact' />;
      } else {
        return <p>No image available</p>;
      }
    }
  }

  class ArtefactText extends React.Component {
    render () {
      return (
        <p>ArtefactText: {this.props.objectText}</p>
      );
    }
  }

export default App