// src/components/App.js
import React, { useState, useEffect } from 'react';

// App Component
const App = () => {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({
    name: '',
    image: '',
    price: ''
  });
  const [search, setSearch] = useState('');

  // Fetch the plants on component mount
  useEffect(() => {
    fetchPlants();
  }, []);

  // Fetch all plants from the backend
  const fetchPlants = async () => {
    try {
      const response = await fetch('http://localhost:6001/plants');
      const data = await response.json();
      setPlants(data);
    } catch (error) {
      console.error('Error fetching plants:', error);
    }
  };

  // Handle form submission to add a new plant
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:6001/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlant),
      });
      const addedPlant = await response.json();
      setPlants([...plants, addedPlant]);  // Update the state with the new plant
      setNewPlant({ name: '', image: '', price: '' });  // Clear form
    } catch (error) {
      console.error('Error adding plant:', error);
    }
  };

  // Handle plant search
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle marking a plant as sold out
  const markSoldOut = async (id) => {
    try {
      const plant = plants.find((p) => p.id === id);
      const updatedPlant = {
        ...plant,
        inStock: !plant.inStock,  // Toggle inStock (true/false)
        soldOut: !plant.soldOut,  // Optionally toggle soldOut as well
      };

      await fetch(`http://localhost:6001/plants/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlant),
      });

      setPlants(plants.map(p => (p.id === id ? updatedPlant : p)));
    } catch (error) {
      console.error('Error updating plant stock:', error);
    }
  };

  // Handle deleting a plant
  const deletePlant = async (id) => {
    try {
      await fetch(`http://localhost:6001/plants/${id}`, {
        method: 'DELETE',
      });
      setPlants(plants.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  return (
    <div className="App">
      <h1>Plantsy Admin</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search plants"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Plant List */}
      <ul>
        {filteredPlants.map((plant) => (
          <li key={plant.id}>
            <h3>{plant.name}</h3>
            <img src={plant.image} alt={plant.name} width="100" />
            <p>Price: ${plant.price}</p>
            <button onClick={() => markSoldOut(plant.id)}>
              {plant.soldOut ? 'Sold Out' : 'Mark as Sold Out'}
            </button>
            <button onClick={() => deletePlant(plant.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Add Plant Form */}
      <h2>Add a New Plant</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={newPlant.name}
          onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
          required
        />
        <label>Image URL:</label>
        <input
          type="text"
          value={newPlant.image}
          onChange={(e) => setNewPlant({ ...newPlant, image: e.target.value })}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          value={newPlant.price}
          onChange={(e) => setNewPlant({ ...newPlant, price: e.target.value })}
          required
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
};

export default App;
