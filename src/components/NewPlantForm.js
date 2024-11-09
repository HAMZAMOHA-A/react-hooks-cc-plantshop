import React from 'react';

const PlantForm = ({ newPlant, handleInputChange, handleAddPlant }) => {
  return (
    <form onSubmit={handleAddPlant}>
      <h2>Add New Plant</h2>
      <input
        type="text"
        name="name"
        placeholder="Plant Name"
        value={newPlant.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newPlant.image}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newPlant.price}
        onChange={handleInputChange}
      />
      <button type="submit">Add Plant</button>
    </form>
  );
};

export default PlantForm;
