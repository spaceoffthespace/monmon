import React from 'react';
import './Partners.css'; // Make sure to import the CSS file

// Here are some sample partner logos, replace these with your actual partner logos
import aliexpress from '../../assets/partners/AliExpress-logo.png';
import ebay from '../../assets/partners/EBay_logo.png';
import etsy from '../../assets/partners/Etsy_logo.svg.png';
import shopify from '../../assets/partners/Shopify-Logo.png';
import amazon from '../../assets/Amazon_logo.png';

const Partners = () => {
  return (
    <div className="partners-container">
      <h2>Powered by</h2>
      <div className="partners-grid">
        <div className="partner-item">
          <img src={aliexpress}  />
        </div>
        <div className="partner-item">
          <img src={ebay}  />
        </div>
        <div className="partner-item">
          <img src={etsy}  />
        </div>
        <div className="partner-item">
          <img src={shopify}  />
        </div>
        
        <div className="partner-item">
          <img id='amazon-logo-shj' src={amazon} />
        </div>
  
        {/* Repeat this pattern for more logos */}
      </div>
    </div>
  );
}

export default Partners;
