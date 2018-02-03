import React, { PureComponent } from 'react';
import Lightbox from 'react-image-lightbox';
import categories from './categories';

import FourZeroFour from './FourZeroFour';

const thumbSrc = (img) => {
  return `${process.env.PUBLIC_URL}/thumbs/${img}`;
}

const imgSrc = (img) => {
  return `${process.env.PUBLIC_URL}/images/${img}`;
}

class Thumb extends PureComponent {
  state = { loaded: false };
    
  render() {
    const { src, onClick } = this.props;
    const { loaded } = this.state;
    return (<img className={`thumb ${loaded ? 'loaded' : ''}`} onLoad={() => { this.setState({ loaded: true }); }} src={src} alt="Click to enlarge" onClick={onClick} />);
  }
}

class Category extends PureComponent {
  state = { isOpen: false, photoIndex: 0 };
  render() {
    const { isOpen, photoIndex } = this.state;
    const { match } = this.props;
    const { category } = match.params;
    const thisCategory = categories[category];
    if (!thisCategory) {
      return (<FourZeroFour />);
    }
    const { images } = thisCategory;
    return (
      <div>
        <h1 style={{ marginLeft: 10, marginTop: 0, color: thisCategory.color }}>{thisCategory.title}</h1>
        <div className="thumbs">
          {images.map((img, i) => {
            return (<Thumb key={i} src={thumbSrc(img)} onClick={() => { this.setState({ isOpen: true, photoIndex: i }); }} />);
          })}
          {isOpen && (
            <Lightbox
             mainSrc={imgSrc(images[photoIndex])}
             nextSrc={imgSrc(images[(photoIndex + 1) % images.length])}
             prevSrc={imgSrc(images[(photoIndex + images.length - 1) % images.length])}
             onCloseRequest={() => this.setState({ isOpen: false })}
             onMovePrevRequest={() =>
               this.setState({
                 photoIndex: (photoIndex + images.length - 1) % images.length,
               })
             }
             onMoveNextRequest={() =>
               this.setState({
                 photoIndex: (photoIndex + 1) % images.length,
               })
             }
            />
          )}
        </div>
      </div>
    );
  }
}

export default Category;
