import React from 'react';
import './Partners.css'; // Make sure to import the CSS file

// Here are some sample partner logos, replace these with your actual partner logos
import aliexpress from '../../assets/partners/AliExpress-logo.png';
import ebay from '../../assets/partners/EBay_logo.png';
import etsy from '../../assets/partners/Etsy_logo.svg.png';
import shopify from '../../assets/partners/Shopify-Logo.png';

const Partners = () => {
  return (
    <div className="partners-container">
      <h2>Partners</h2>
      <div className="partners-grid">
        <div className="partner-item">
          <img src={aliexpress} alt="Partner 1" />
        </div>
        <div className="partner-item">
          <img src={ebay} alt="Partner 2" />
        </div>
        <div className="partner-item">
          <img src={etsy} alt="Partner 3" />
        </div>
        <div className="partner-item">
          <img src={shopify} alt="Partner 4" />
        </div>
        {/* Repeat this pattern for more logos */}
      </div>
    </div>
  );
}

export default Partners;
