import React from 'react';
import ImageGallery from "./ImageGallery";
import * as Constants from '../constants/Constants.js';

class ArtefactDetails extends React.Component {
    render () {
      var return_value = null;

      switch (this.props.dataRequestStatus) {
        case Constants.DATA_REQUEST_STATUS.NONE_MADE:   
          return_value = null;
        break;

        case Constants.DATA_REQUEST_STATUS.LOADING:   
          return_value = <div className={Constants.DISPLAY_ARTEFACT_MESSAGE}><p>Loading...</p></div>;
        break;

        case Constants.DATA_REQUEST_STATUS.FAILURE:
          return_value = <div className={Constants.DISPLAY_ARTEFACT_MESSAGE_ERROR}><p>{this.props.errorMessage}</p></div>;
        break;

        case Constants.DATA_REQUEST_STATUS.SUCCESS:
          return_value = (
            <div className={Constants.DISPLAY_ARTEFACT_CONTENT}>
              <ArtefactName objectName={this.props.objectData.objectName} />
              <ArtefactSlug objectSlug={this.props.objectData.objectSlug}/>
              <ArtefactPrimaryImage objectPrimaryImageURL={this.props.objectData.objectPrimaryImageURL}/>
              <ImageGallery imageUrls={this.props.objectData.objectImages} onClick={this.props.onClick}/>
              <ArtefactText objectText={this.props.objectData.objectText}/>
              <ArtefactFullText objectFullText={this.props.objectData.objectFullText}/>
            </div>
          );
        break;

        default:
          return_value = <p>This message should never be seen</p>
        break;
      }

      return return_value;
    }
  }

  class ArtefactName extends React.Component {
    render () {
      return (
        <h2>{this.props.objectName}</h2>
      );
    }
  }

  class ArtefactSlug extends React.Component {
    render () {
      return (
        <p>{this.props.objectSlug}</p>
      );
    }
  }

  class ArtefactPrimaryImage extends React.Component {
    render () {
      if (this.props.objectPrimaryImageURL) {
        return <div className={Constants.DISPLAY_PRIMARY_IMAGE_WRAPPER}><img className= {Constants.DISPLAY_PRIMARY_IMAGE} src={this.props.objectPrimaryImageURL} alt='Primary visual representation of artefact' /></div>;
      } else {
        return <p>{Constants.MESSAGE_NO_IMAGE}</p>;
      }
    }
  }

  class ArtefactText extends React.Component {
    render () {
      return (
        <p>{this.props.objectText}</p>
      );
    }
  }

  class ArtefactFullText extends React.Component {
    //<p>{this.props.objectFullText}.split('\n').map((item, i) => <p key={i}>{item}</p>);</p>
    render () {
      return (
        <React.Fragment>
          <p>Artefact Full Text:</p>
          <p>{this.props.objectFullText}</p>
        </React.Fragment>
      );
    }
  }

  export default ArtefactDetails