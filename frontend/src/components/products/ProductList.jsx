import React, { useState } from 'react';
import ProductCard from './ProductCard'; 
import './Product.css'
import image1 from '../Assets/Images.svg'
import image2 from '../Assets/image 2.svg'
import image3 from '../Assets/Images (1).svg'
import image4 from '../Assets/Image 5.svg'
import image5 from '../Assets/image 6.svg'
import image7 from '../Assets/Images (2).svg'
import image8 from '../Assets/image 7.svg'
import image9 from '../Assets/image 8.svg'
import image10 from '../Assets/inside-weather-dbH_vy7vICE-unsplash.jpg'
import image11 from '../Assets/sofa.avif'
import image12 from '../Assets/salon.avif'
import image13 from '../Assets/table.avif'

const initialProducts = [
  { id: 1, name: 'Syltherine', description: 'Stylish cafe chair', price: 2500000, oldPrice: 3500000, image: image1 },
  { id: 2, name: 'Leviosa', description: 'Stylish cafe chair', price: 2500000, image: image2 },
  { id: 3, name: 'Lolito', description: 'Luxury big sofa', price: 7000000, oldPrice: 14000000, image: image3 },
  {id: 4, name: 'Respira', description: 'Outdoor bar table and stool', price: 500000, image: image7 },
  { id: 5, name: 'Grifo', description: 'Night lamp', price: 1500000, image: image4 },
  { id: 6, name: 'Muggo', description: 'Small mug', price: 150000, image: image5 },
  { id: 7, name: 'Pingky', description: 'Cute bed set', price: 7000000, oldPrice: 14000000, image: image8 },
  { id: 8, name: 'Potty', description: 'Minimalist flower pot', price: 500000, image: image9 },

];

const moreProducts = [
  { id: 4, name: 'Leviosa', description: 'Modern sofa', price: 1500000, image: image10 },
  { id: 5, name: 'Asgaard sofa', description: 'Stylish cafe chair', price: 250000, image: image11 },
  { id: 6, name: 'Pingky', description: 'Cute bed set', price: 7000000, oldPrice: 14000000, image: image12 },
  { id: 7, name: 'Potty', description: 'Minimalist flower pot', price: 500000, image: image13 },
  
];

const ProductList = () => {
  const [products, setProducts] = useState(initialProducts);
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setProducts([...products, ...moreProducts]); // Load more products
    setShowMore(true); // Disable the button after showing more
  };

  return (
    <div className="product-list-container">
      <h2>Our Products</h2>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {!showMore && (
        <button className="show-more" onClick={handleShowMore}>
          Show More
        </button>
      )}
    </div>
  );
};

export default ProductList;
