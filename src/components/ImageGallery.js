import React from "react";
import * as Constants from '../constants/Constants.js';
import PropTypes from 'prop-types';
  
function imagesLoaded(parentNode) {
  const imgElements = parentNode.querySelectorAll("img");
  for (const img of imgElements) {
    if (!img.complete) {
      return false;
    }
  }
  return true;
}

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  handleStateChange = () => {
    this.setState({
      loading: !imagesLoaded(this.galleryElement),
    });
  }

  renderSpinner() {
    if (!this.state.loading) {
      // Render nothing if not loading
      return null;
    }
    return (
      <div className="centeredOverlay">
        <span className="spinner"></span>
      </div>
    );
  }

  renderImage(imageUrl) {
    return (
      <div className="responsive" key={imageUrl}>
        <div className="galleryPane">
          <img src={imageUrl} alt={imageUrl} className={Constants.ARTEFACT_PREVIEW_IMAGE} onLoad={this.handleStateChange} onError={this.handleStateChange} onClick={this.props.onClick}/>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="gallery wrapper" ref={element => { this.galleryElement = element; }}>
          {this.renderSpinner()}
          {this.props.imageUrls.map(imageUrl => this.renderImage(imageUrl))}
        <div className="clearfix"></div>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ImageGallery;