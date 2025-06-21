import React, { useState } from 'react';
import axios from 'axios';
import './ItemModal.css';

const ItemModal = ({ item, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleEnquiry = async () => {
    try {
      await axios.post('http://localhost:8000/api/items/enquire/', {
        item_name: item.name,
        item_id: item.id
      });
      window.confirm('Enquiry email sent successfully!');
    } catch (err) {
      alert('Failed to send enquiry email.');
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button onClick={onClose} className="modal-close-btn">✕</button>
        <h2 className="modal-title">{item.name}</h2>
        <p className="modal-description">{item.description}</p>

        {item.images.length > 0 && (
          <div className="carousel-container">
            <button onClick={handlePrev} className="carousel-btn left">‹</button>
            <img
              src={`http://localhost:8000${item.images[activeIndex].image}`}
              alt=""
              className="carousel-image"
            />
            <button onClick={handleNext} className="carousel-btn right">›</button>
          </div>
        )}

        <button className="enquire-btn" onClick={handleEnquiry}>Enquire</button>
      </div>
    </div>
  );
};

export default ItemModal;
