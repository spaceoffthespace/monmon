import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductSlider.css"; // Import your CSS file here
import HonorRoll from "../Honorroll/Honoroll";
import Nswitch from '../../assets/products/switch.webp';
import doggy from '../../assets/products/doggy.webp';
import ps5 from '../../assets/products/ps5.webp';
import blen from '../../assets/products/blen.jpg';
import dslr from '../../assets/products/22112.png';
import drone from '../../assets/products/drone.jpg';
import bag from '../../assets/products/bag.webp';
import decor from '../../assets/products/decor.webp';
import shoes from '../../assets/products/shoes.webp';
import dogbed from '../../assets/products/dogbed.jpg';
import watch8 from '../../assets/products/watch8.webp';
import macbook from '../../assets/products/macbook.jpg';
import rolly from '../../assets/products/rolly.jpg';
import HonorRoll2 from "../Honorroll/HonorRoll2";
export default function SimpleSlider() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      swipeToSlide: true,
      centerMode: true,
      centerPadding: "0",
      autoplay: true,           // Enable Autoplay
      autoplaySpeed: 3000,      // Slide will change every 2 seconds
    };
  
    const settingsRtl = {
      ...settings,
      rtl: true,               // Enable Right-to-Left mode
    };
  
    // Define an array of images for the slides
    const slideImages = [Nswitch, bag, ps5,blen , dslr, rolly, dogbed, drone, decor,shoes , watch8];
  
    return (
      <div className="slider-slider">

  
      <div className="slider-container">
        <Slider {...settings}>
          {slideImages.map((image, index) => (
              <div key={index} className="slider-item">
              <div className="image-container">
                <img src={image} alt={`Slide ${index}`} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
     

      <HonorRoll2/>
      
     

      </div>
    );
  }