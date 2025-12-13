import { useState } from 'react'
import './App.css'

function App() {
  const [randomRestaurant, setRandomRestaurant] = useState(null);
  const getRandomRestaurant = () => {
    fetch('http://localhost:8000/restaurants/random')
      .then(response => response.json())
      .then(data => setRandomRestaurant(data))
  }

  return (
    <>
      <h1>Restaurandom</h1>
      <div className="card">
        <button onClick={getRandomRestaurant}>
          Click for a random restaurant!
        </button>
        {randomRestaurant && (
          <div className="restaurant">
            <p>{randomRestaurant.name} - {randomRestaurant.category}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
