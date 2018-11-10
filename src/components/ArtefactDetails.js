import React from 'react';
import ImageGallery from "./ImageGallery";
import * as Constants from '../constants/Constants.js';

class ArtefactDetails extends React.Component {
    componentDidUpdate(prevProps) {
      const element = document.getElementById(Constants.DISPLAY_ARTEFACT_CONTENT);
      if (element && this.props.objectData !== prevProps.objectData) {
        //alert("test");
        element.scrollIntoView({ block: 'start', inline: "nearest", behavior: 'smooth' });
      }
    }

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
            <div className={Constants.DISPLAY_ARTEFACT_CONTENT} id={Constants.DISPLAY_ARTEFACT_CONTENT}>
              <ArtefactName objectName={this.props.objectData.objectName} />
              <ArtefactSlug objectSlug={this.props.objectData.objectSlug}/>
              <ArtefactPrimaryImage objectPrimaryImageURL={this.props.objectData.objectPrimaryImageURL}/>
              <ImageGallery imageUrls={this.props.objectData.objectImages} onClick={this.props.onClick}/>
              <ArtefactText objectText={this.props.objectData.objectText}/>
              <ArtefactFullText objectFullText={this.props.objectData.objectFullText} objectFullDetails={this.props.objectData.objectFullDetails}/>
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
    componentDidUpdate(prevProps) {
      const element = document.getElementById(Constants.DISPLAY_ARTEFACT_CONTENT);
      if (element && this.props.objectPrimaryImageURL !== prevProps.objectPrimaryImageURL) {
        //alert("test");
        element.scrollIntoView({ block: 'start', inline: "nearest", behavior: 'smooth' });
      }
    }

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
    render () {
      return (
        <div>
          <h2>Artefact Full Text:</h2>
          <SetOfDetails artefactDetails={this.props.objectFullDetails} />
        </div>
      );
    }
  }

  function SetOfDetails(props) {
    const details = props.artefactDetails;
    const display = details.map((detail, index) => DisplayDetails(detail, index));
    return display;
  }

  function DisplayDetails(detail, index) {
    var artefactDetail = detail;

    if (Array.isArray(detail.text)) {
      var subgroup;
      if (detail.text.length === 1) {
        subgroup = artefactDetail.text[0].map((detail, index) => DisplayDetails(detail, index));
      } else {
        subgroup = artefactDetail.text.map((detail, index) => DisplayDetailsSubGroup(detail, index));
      }
        
      return (
        <div key={index} className={Constants.DISPLAY_ARTEFACT_DETAILS_GROUP}>
          <h3 className={Constants.DISPLAY_ARTEFACT_DETAILS_SUBHEADING}>{artefactDetail.title}:</h3>
          <div className={Constants.DISPLAY_ARTEFACT_DETAILS_SUBGROUP}>{subgroup}</div>
        </div>
      );
    } else {
      return (
        <div key={index} className={Constants.DISPLAY_ARTEFACT_DETAILS_GROUP}>
          <h3 className={Constants.DISPLAY_ARTEFACT_DETAILS_HEADING}>{artefactDetail.title}:</h3>
          <p className={Constants.DISPLAY_ARTEFACT_DETAILS_TEXT}>{artefactDetail.text}</p>
        </div>
      );
    }
  }

  function DisplayDetailsSubGroup(detail, index) {
    const subgroupdetails = detail.map((inner_detail, index) => DisplayDetails(inner_detail, index));
    var ordinal = ordinal_suffix_of(index + 1);
    return (
      <div key={index} className={Constants.DISPLAY_ARTEFACT_DETAILS_GROUP}>
        <h3>{ordinal}:</h3>
        <div key={index} className={Constants.DISPLAY_ARTEFACT_DETAILS_SUBGROUP}>
          {subgroupdetails}
        </div>
      </div>
    );
  }

  function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
  }

  export default ArtefactDetails