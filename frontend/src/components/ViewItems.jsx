import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemModal from './ItemModal';
import './ViewItem.css';

function ViewItems() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/items/')
      .then(res => setItems(res.data))
      .catch(err => console.error('Error loading items:', err));
  }, []);

  return (
    <div className="view-items-container">
      <h2 className="heading">Items</h2>
      <div className="items-grid">
        {items.map(item => (
          <div key={item.id} className="item-card" onClick={() => setSelected(item)}>
            <div className="item-image-container">
              <img
                src={`http://localhost:8000${item.cover_image}`}
                alt={item.name}
                className="item-image"
              />
            </div>
            <div className="item-info">
              <h5 className="item-title">{item.name}</h5>
            </div>
          </div>
        ))}
      </div>

      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default ViewItems;
