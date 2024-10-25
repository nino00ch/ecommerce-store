import React from 'react'
import './Hero.css'
import bannerImage from '../Assets/scandinavian-interior-mockup-wall-decal-background 1.svg'
import dinning from '../Assets/Mask Group (1).svg' 
import living from '../Assets/Image-living room.svg'
import bedroom from '../Assets/Mask Group.svg'
import Product from '../products/ProductCard'
import ProductList from '../products/ProductList'
import room from '../Assets/Rectangle 24.svg'
import kitchen from '../Assets/Rectangle 25.svg'
import table from '../Assets/table1.avif'
import decore from '../Assets/decor.avif'
import salon from '../Assets/salon.avif'
import { useState } from 'react'
const Hero = () => {
        const [currentIndex, setCurrentIndex] = useState(0);
      
    const images = [
        { id: 1, src: kitchen },
        { id: 2, src: table },
        { id: 3, src: decore },
        { id: 4, src: salon },
       
      ];
      const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      };
    
      const prevImage = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    return (
        <div className="div">
             <section className="hero-section">
          <div className="hero-content">
            <img src={bannerImage} alt="Hero" className="hero-image" />
            <div className="hero-text">
              <h5>New Arrival</h5>
              <h1>Discover Our New Collection</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
              </p>
              <button className="hero-button">Buy Now</button>
            </div>
          </div>
        </section>
       <section className='range'>
        <div className="title">
            <h2>Browse The Range</h2>
           <p> Lorem ipsum dolor sit amet, consectetur adipiscing eli   </p>  
        </div>
        <div className="images">
               <div className="dining">
               <img src={dinning} alt="" />
               <p>Dining</p>
               </div>
                <div className="living">
                <img src={living} alt="" />
                <p>Living</p>
                </div>
               <div className="bedroom">
               <img src={bedroom} alt="" />
                <p>Bedroom</p>
               </div>
        </div>  

       </section>
       <section>
        <ProductList/>
       </section>
       <section className='section'>
        <div className="left">
            <h1>50+ Beautiful rooms inspiration</h1>
            <p>Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
            <button>
                Explore More
            </button>
        </div>
        <div className="right">
                <img className="room" src={room} alt="" />
                <div className="carousel-container">
                  <div className="carousel-content">
                      {/* Left Arrow */}
                      <button onClick={prevImage} className="arrow-left">{'<'}</button>

                     {/* Display Current Image */}
                      <div className="image-section">
                         <img src={images[currentIndex].src} alt={images[currentIndex].title} />
                      </div>

                      {/* Right Arrow */}
                      <button onClick={nextImage} className="arrow-right">{'>'}</button>
                   </div>
              </div>
  
            </div>
       </section>

       <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3"> 

            <h3 className="footer-title">Funiro.</h3>

            <p>400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
          </div>
          <div className="col-md-3">
            <h3 className="footer-title-1">Links</h3>
            <ul className="footer-list">
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3 className="footer-title-1">Help</h3>
            <ul className="footer-list">
              <li><a href="#">Payment Options</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Privacy Policies</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3 className="footer-title-1">Newsletter</h3>
            <form className="footer-form">
              <input type="email" placeholder="Enter Your Email Address" />
              <button type="submit">SUBSCRIBE</button>
            </form>
          </div>
        </div>
        <div className="row">

          <div className="col-md-12-text-center">
            <p>&copy; 2023 Funiro. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
        </div>
       
        
      );
}

export default Hero