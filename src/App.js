import React from 'react';
import logo from './logo.svg';
import './App.css';

const SEARCH_SOURCE_SELECT = "search_source_select"
const SEARCH_INPUTBOX = "search_inputbox"
const SEARCH_BUTTON = "search_button"
const SOURCES = {
  V_AND_A: "v_and_a",
  BRITMUS: "british_museum",
  OTHER: "other"
}
const dataRequestStatus = {
  NONE_MADE: "none",
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSource: SOURCES.V_AND_A,
      lastSearchSource : null,
      dataRequestStatus: dataRequestStatus.NONE_MADE,
      objectData: [],
      objectID: null,
      errorMessage: null,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    switch (event.target.id) {
      case SEARCH_BUTTON:
        if (this.state.objectID) {
          this.setState({
            dataRequestStatus: dataRequestStatus.LOADING,
            errorMessage: null,
            lastSearchSource: this.state.selectedSource,
          });
          this.buildUrl();
        } //else there is no search term, so no action. oin future, have button disabled until there is a term.
      break;

      default:
      break;
    }
  }

  handleChange(event) {
    switch (event.target.id) {
      case SEARCH_INPUTBOX:
        this.setState({
          objectID: event.target.value
        })
      break;

      case SEARCH_SOURCE_SELECT:
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
      case SOURCES.V_AND_A:
      finalURL = "https://www.vam.ac.uk/api/json/museumobject/" + this.state.objectID
      break;

      case SOURCES.BRITMUS:
      finalURL = "https://www.brit-mus-api.com/need-this-url/" + this.state.objectID + "/root"
      break;

      case SOURCES.OTHER:
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
            dataRequestStatus: dataRequestStatus.SUCCESS,
            objectData: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            dataRequestStatus: dataRequestStatus.FAILURE,
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
        <select id={SEARCH_SOURCE_SELECT} value={this.state.selectedSource} onChange={this.handleChange}>
          <option value={SOURCES.V_AND_A}>V&A Museum</option>
          <option value={SOURCES.BRITMUS}>British Museum</option>
          <option value={SOURCES.OTHER}>Other</option>
        </select>
        <input type="text" id={SEARCH_INPUTBOX} onChange={this.handleChange} />
        <button className="button" id={SEARCH_BUTTON} onClick={this.handleClick}>Load Artefact</button>
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

      if (this.props.dataRequestStatus === dataRequestStatus.SUCCESS) {
        switch (this.props.source) {
          case SOURCES.V_AND_A:
            fields.objectName = (!this.props.objectData[0].fields.title) ? "Unknown" : this.props.objectData[0].fields.title;
            if (this.props.objectData[0].fields.primary_image_id) {
              fields.objectPrimaryImageURL = 'http://media.vam.ac.uk/media/thira/collection_images/' + this.props.objectData[0].fields.primary_image_id.substring(0, 6) + '/' + this.props.objectData[0].fields.primary_image_id + '.jpg'
            };
          break;

          case SOURCES.BRITMUS:
          break;

          case SOURCES.OTHER:
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
        case dataRequestStatus.NONE_MADE:   
          return_value = null;
        break;

        case dataRequestStatus.LOADING:   
          return_value = <p>Loading...</p>;
        break;

        case dataRequestStatus.FAILURE:
          return_value = <p>Error: {this.props.errorMessage}</p>
        break;

        case dataRequestStatus.SUCCESS:
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