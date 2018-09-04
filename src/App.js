import React from 'react';
import logo from './logo.svg';
import './App.css';

const SEARCH_INPUTBOX = "search_inputbox"
const SEARCH_SOURCE_SELECT = "search_source_select"
const SOURCES = {
  V_AND_A: "v_and_a",
  BRITMUS: "british_museum",
  OTHER: "other"
}
//const SOURCE_RESPONSE = {
//  SUCCESS: true,
//  FAILURE: false,
//}
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
      requestExternalData: false,
      isLoaded: false,
      errorMessage: null,
      //dataLoaded: false,
      primaryImageURL: null,
      objectID: null,
      source: SOURCES.V_AND_A,
      object_data: [],
      dataRequestStatus: dataRequestStatus.NONE_MADE
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleClick() {
    //alert(this.state.objectID);
    if (this.state.objectID) {
      this.setState({
        requestExternalData: true,
        dataRequestStatus: dataRequestStatus.LOADING,
        errorMessage: null,
      });

      //// TESTING!
      this.buildUrl();
      ////

    } //else there is no search term, so no action. oin future, have button disabled until there is a term.
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
        source: event.target.value
      });
      break;

      default:
      break;
    }
  }

  buildUrl() {
    let finalURL = null;

    switch (this.state.source) {
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
            isLoaded: true,
            dataRequestStatus: dataRequestStatus.SUCCESS,
            object_data: result,
          });
          this.updateFields();
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            //error: error,
            dataRequestStatus: dataRequestStatus.FAILURE,
            errorMessage: error.message,
          });
          this.updateFields();
        }
      )
  }

  updateFields() {
    if (this.state.dataRequestStatus === dataRequestStatus.SUCCESS) {
      switch (this.state.source) {
        case SOURCES.V_AND_A:   
          let imageURL = null;
          if (this.state.object_data[0].fields.primary_image_id) {
            imageURL = 'http://media.vam.ac.uk/media/thira/collection_images/' + this.state.object_data[0].fields.primary_image_id.substring(0, 6) + '/' + this.state.object_data[0].fields.primary_image_id + '.jpg'
          };
          this.setState({
            primaryImageURL: imageURL,
            requestExternalData: false,
          });
        break;

        case SOURCES.BRITMUS:
        break;

        case SOURCES.OTHER:
        break;

        default:
        break;
      }
    } else {
      this.setState({
        primaryImageURL: null,
        requestExternalData: false,
        object_data: [],
      });
    }
  }

  //reset(url) {
  reset() {
    this.setState({
      //dataLoaded: true,
      requestExternalData: false,
      primaryImageURL: null,
      isLoaded: false,
      errorMessage: null,
    });
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
          Search for an object by ID! eg. O61949
        </p>
        <select id={SEARCH_SOURCE_SELECT} value={this.state.source} onChange={this.handleChange}>
          <option value={SOURCES.V_AND_A}>V&A Museum</option>
          <option value={SOURCES.BRITMUS}>British Museum</option>
          <option value={SOURCES.OTHER}>Other</option>
        </select>
        <input type="text" id={SEARCH_INPUTBOX} value={this.state.value} onChange={this.handleChange} />
        <button className="button" id="search" onClick={this.handleClick}>Load Artefact</button>
      </div>
      <div className="external-data">
        <PrimaryImageV3 dataRequestStatus={this.state.dataRequestStatus} primaryImageURL={this.state.primaryImageURL} errorMessage={this.state.errorMessage} isLoaded={this.state.isLoaded} requestExternalData={this.state.requestExternalData}/>
      </div>
    </div>);
    }
  }

  // TAKE 2:
  //<PrimaryImage objectID={this.state.objectID} requestExternalData={this.state.requestExternalData} reset={this.reset}/>
        
  // TAKE 1:
  //<ExternalData requestExternalData={this.state.requestExternalData} objectID={this.state.objectID} reset={this.reset} />
  //<img src={this.state.primaryImageURL} alt='test' />



  class ArtefactDetails extends React.Component {
    render () {
      return null;
    }
  }


  class PrimaryImageV3 extends React.Component {
    render () {
      let return_value = '';

      switch (this.props.dataRequestStatus) {
        case dataRequestStatus.NONE_MADE:   
          return_value = null;
        break;

        case dataRequestStatus.LOADING:   
          return_value = <p>Loading...</p>;
        break;

        case dataRequestStatus.SUCCESS:   
          return_value = <img src={this.props.primaryImageURL} alt='Primary visual representation of artefact' />;
        break;

        case dataRequestStatus.FAILURE:
          return_value = <p>Error: {this.props.errorMessage}</p>
        break;

        default:
          return_value = <p>Error: This message should never be seen</p>
        break;
      }

      return return_value;

      /*
      if (this.props.errorMessage) {
        return <p>Error: {this.props.errorMessage}</p>
      } else {
        if (this.props.primaryImageURL) {
          return <img src={this.props.primaryImageURL} alt='Primary visual representation of artefact' />;
        } else {
          if (this.props.requestExternalData) {
            return <p>Loading...</p>
          } else {
            if (this.props.isLoaded) {
              return <p>Sorry - No image available</p>
            } else {
              //return <p>SHOULD NEVER APPEAR???...</p>
              return null;
            }
          }
        }
      }
      */

    }
  }




class PrimaryImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //dataLoaded: false,
      //requestExternalData: false,
      primaryImageURL: null,
      foundImage: null,
    };
    
    this.resetPrimaryImageLoad = this.resetPrimaryImageLoad.bind(this);
  }
  
  resetPrimaryImageLoad(url) {
    this.setState({
      //dataLoaded: true,
      //requestExternalData: false,
      primaryImageURL: url,
    });
    //this.props.reset(url);
    this.props.reset();
  }

  render () {
    if (this.props.requestExternalData) {
    //if (this.props.requestExternalData || this.props.dataLoaded) {
    //if (this.state.primaryImageURL==null && this.props.requestExternalData) {
      return (
        <GetExternalDataNEW objectID={this.props.objectID} resetPrimaryImageLoad={this.resetPrimaryImageLoad}/>
      );
    } else if (this.state.primaryImageURL != null) {
      return (
        <img src={this.state.primaryImageURL} alt='THE NEW WAY' />
      );
    } else {
      return <p>NOTHING TO SEE</p>
      //return null;
    }
  }
}

class GetExternalDataNEW extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      imageURL: '',
    };
    //alert('gedN cons');
  }

  componentDidMount() {
    let imageURL = '';
    fetch("https://www.vam.ac.uk/api/json/museumobject/" + this.props.objectID)
      .then(res => res.json())
      .then(
        (result) => {
          imageURL = 'http://media.vam.ac.uk/media/thira/collection_images/' +
            result[0].fields.primary_image_id.substring(0, 6) + '/' + result[0].fields.primary_image_id +
            '.jpg';
          //alert(imageURL);
          //alert(this.props.resetPrimaryImageLoad);
          this.setState({
            imageURL: imageURL,
            isLoaded: true,
            //items: result.items
          });
          this.props.resetPrimaryImageLoad(imageURL);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          this.props.resetPrimaryImageLoad(null);
        }
      )
  }

  render() {
    //const {error, isLoaded, imageURL} = this.state;
    const {error, isLoaded} = this.state;
    if (error) {
      return <div>Error:{error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      //return (
      //  <img src={imageURL} alt='Primary visual representation of artefact' />
      //);
      return <p>this should never be seen</p>;
    }
  }
}






function ExternalData(props) {
  if (props.requestExternalData || props.dataLoaded) {
    return (
      <div>
      <GetExternalData objectID={props.objectID} reset={props.reset}/>
      </div>
    );
  } else {
    return (
      '' //<p>nothing to see</p>
    );
  }
}

class GetExternalData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      imageURL: 'x',
      //items: []
    };
  }

  componentDidMount() {
    let imageURL = '';
    fetch("https://www.vam.ac.uk/api/json/museumobject/" + this.props.objectID)
      .then(res => res.json())
      .then(
        (result) => {
          imageURL = 'http://media.vam.ac.uk/media/thira/collection_images/' +
            result[0].fields.primary_image_id.substring(0, 6) + '/' + result[0].fields.primary_image_id +
            '.jpg';
          //alert(imageURL);
          this.setState({
            imageURL: imageURL,
            isLoaded: true,
            //items: result.items
          });
          this.props.reset(imageURL);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          this.props.reset(imageURL);
        }
      )
  }

  render() {
    const {error, isLoaded, imageURL} = this.state;
    if (error) {
      return <div>Error:{error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <img src={imageURL} alt='Primary visual representation of artefact' />
      );
    }
  }
}

export default App