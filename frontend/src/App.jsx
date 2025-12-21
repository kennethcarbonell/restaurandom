import { useState } from 'react'
import './App.css'

function App() {
  const [restaurant, setRestaurant] = useState(null)

  const getRandomRestaurant = async () => {
    const res = await fetch('http://localhost:8000/restaurants/random')
    const data = await res.json()
    setRestaurant(data)
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
          <p>{restaurant.name}</p>
          <p>{restaurant.category}</p>
        </div>
      )}
      </div>
    </>
  )
}

export default App
