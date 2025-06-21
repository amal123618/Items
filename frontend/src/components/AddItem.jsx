import React, { useState } from 'react';
import axios from 'axios';
import './AddItem.css';

const AddItem = () => {
  const [form, setForm] = useState({
    name: '',
    item_type: '',
    description: '',
    cover_image: null,
    images: [],
  });

  const [message, setMessage] = useState('');
  const [previewImages, setPreviewImages] = useState([]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCoverChange = (e) => {
    setForm({ ...form, cover_image: e.target.files[0] });
  };

  const handleImageChange = (index, file) => {
    const newImages = [...form.images];
    newImages[index] = file;
    setForm({ ...form, images: newImages });

    const previews = [...previewImages];
    previews[index] = URL.createObjectURL(file);
    setPreviewImages(previews);
  };

  const addImageInput = () => {
    setForm({ ...form, images: [...form.images, null] });
    setPreviewImages([...previewImages, null]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', form.name);
    data.append('item_type', form.item_type);
    data.append('description', form.description);
    data.append('cover_image', form.cover_image);

    form.images.forEach((img) => {
      if (img) data.append('images', img);
    });

    try {
      await axios.post('http://localhost:8000/api/items/add/', data);
      setMessage('✅ Item successfully added!');
      setForm({
        name: '',
        item_type: '',
        description: '',
        cover_image: null,
        images: [],
      });
      setPreviewImages([]);
    } catch (err) {
      setMessage('❌ Error while adding item.');
    }
  };

  return (
    <div className="add-item-container">
      <h2 className="add-item-title">🛒 Add New Item</h2>

      {message && (
        <p className={message.includes('successfully') ? 'message-success' : 'message-error'}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label className="add-item-label">Item Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleFieldChange}
          required
          className="add-item-input"
        />

        <label className="add-item-label">Item Type</label>
        <select
          name="item_type"
          value={form.item_type}
          onChange={handleFieldChange}
          required
          className="add-item-select"
        >
          <option value="">-- Select Type --</option>
          <option value="shirt">Shirt</option>
          <option value="pant">Pant</option>
          <option value="shoes">Shoes</option>
          <option value="sports">Sports Gear</option>
        </select>

        <label className="add-item-label">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleFieldChange}
          rows={3}
          required
          className="add-item-textarea"
        />

        <label className="add-item-label">Cover Image</label>
        <input
          type="file"
          name="cover_image"
          accept="image/*"
          onChange={handleCoverChange}
          className="add-item-file"
          required
        />

        <label className="add-item-label">Additional Images</label>
        {form.images.map((img, index) => (
          <div key={index} className="flex items-center gap-4 mb-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e.target.files[0])}
              className="add-item-file"
            />
            {previewImages[index] && (
              <img
                src={previewImages[index]}
                alt="preview"
                className="image-preview"
              />
            )}
          </div>
        ))}

        <button type="button" onClick={addImageInput} className="add-image-button">
          + Add Another Image
        </button>

        <button type="submit" className="submit-button">
          Submit Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
