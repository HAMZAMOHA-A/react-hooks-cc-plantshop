import React, { useState } from 'react';

const PlantCard = ({ plant, handleSoldOut, handleDelete }) => {
  const [price, setPrice] = useState(plant.price);

  // Update the price of the plant
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: newPrice }),
    });
  };

  return (
    <div className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>Price: ${price}</p>
      <input
        type="number"
        value={price}
        onChange={handlePriceChange}
        placeholder="Update price"
      />
      <button onClick={() => handleSoldOut(plant.id)}>
        Mark as Sold Out
      </button>
      <button onClick={() => handleDelete(plant.id)}>
        Delete
      </button>
    </div>
  );
};

export default PlantCard;
