import React from 'react';
import Slider from 'react-slick';
import ImageThumbail from './carousel';

// const fs = window.require("fs");

// const myImgPath = "/home/bdeguigne/Pictures/Angular_full_color_logo.svg.png";
// const myImage= fs.readFileSync(myImgPath, "base64");

export default class ThumbnailSlider extends React.Component {
componentDidMount() {
  console.log("IN THUNBNAIL", this.props.files);
}

  render () {
    var settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      variableWidth: true,
      arrows: true
    };
    return (
      <div style={{width: '97%'}}>
        <Slider {...settings}>
          {this.props.files && this.props.files.map((image, index) => <div key={index}><ImageThumbail src={image.src}/></div>)}
        </Slider>
      </div>
    )
  }
}