import React from 'react';
import * as Constants from '../constants/Constants.js';

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

  export default ArtefactDetails