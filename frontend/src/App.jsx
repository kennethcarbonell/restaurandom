import { useState } from 'react'
import './App.css'

function App() {
  const [restaurant, setRestaurant] = useState(null)

  const getRandomRestaurant = async () => {
    const res = await fetch('http://localhost:8000/restaurants/random')
    const data = await res.json()
    setRestaurant(data)
  }

  const [name, setName] = useState('')
  const [ethnicity, setEthnicity] = useState('')
  const [foodTypes, setFoodTypes] = useState('')
  const addRestaurant = async () => {
    await fetch('http://localhost:8000/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        ethnicity: ethnicity.split(',').map(e => e.trim()),
        foodTypes: foodTypes.split(',').map(f => f.trim())
      })
    })

    setName('')
    setEthnicity('')
    setFoodTypes('')
  }
  return (
    <>
      <div class="card">
      <h1>Restaurandom</h1>

      <button onClick={getRandomRestaurant}>
        Click for a random restaurant!
      </button>

      {restaurant && (
        <div className="restaurant">
          <p>Ethnicity: {restaurant.ethnicity.join(', ')}</p>
          <p>Food Types: {restaurant.foodTypes.join(', ')}</p>
        </div>
      )}
      </div>

      <div className="form">
        <input
          placeholder="Restaurant name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Ethnicity (comma separated)"
          value={ethnicity}
          onChange={e => setEthnicity(e.target.value)}
        />

        <input
          placeholder="Food types (comma separated)"
          value={foodTypes}
          onChange={e => setFoodTypes(e.target.value)}
        />

        <button onClick={addRestaurant}>
          Add restaurant
        </button>
    </div>
    </>
  )
}

export default App
