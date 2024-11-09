import React from 'react';
import PlantCard from './PlantCard';

const PlantList = ({ plants, setPlants }) => {

  // Mark plant as "sold out"
  const handleSoldOut = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ soldOut: true }),
    })
      .then(response => response.json())
      .then(updatedPlant => {
        setPlants(plants.map(plant => plant.id === id ? updatedPlant : plant));
      });
  };

  // Delete a plant
  const handleDelete = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, { method: 'DELETE' })
      .then(() => {
        setPlants(plants.filter(plant => plant.id !== id));
      });
  };

  return (
    <div className="plant-list">
      {plants.map(plant => (
        <PlantCard
          key={plant.id}
          plant={plant}
          handleSoldOut={handleSoldOut}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default PlantList;
