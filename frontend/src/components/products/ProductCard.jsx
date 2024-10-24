import React, { useState } from 'react';
import share from '../Assets/gridicons_share.svg'
import compare from '../Assets/compare-svgrepo-com 1.svg'
import like from '../Assets/Heart (1).svg'
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!product) {
    return null; // Return null if the product is undefined
  }

  return (
    <div 
      className="product-card" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.image ? (
        <img src={product.image} alt={product.name} className="product-image" />
      ) : (
        <div className="placeholder-image">No image available</div> // Handle missing image
      )}
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="price">Rp {product.price.toLocaleString()}</p>
        {product.oldPrice && <p className="old-price">Rp {product.oldPrice.toLocaleString()}</p>}
      </div>

      {isHovered && (
        <div className="hover-content">
          <button className="add-to-cart">Add to Cart</button>
          <div className="product-actions">
            <div className="share">
              <img src={share} alt="" />
            <span>Share</span>
            </div>
            <div className="compare">
              <img src={compare} alt="" />
            <span>Compare</span>
            </div>
            <div className="like">
              <img src={like} alt="" />
            <span>Like</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
