from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import random
from pathlib import Path
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = Path(__file__).parent / "restaurants.json"

remaining_restaurants = []

def read_restaurants():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def write_restaurants(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

@app.get("/restaurants")
def get_restaurants(
    ethnicity: Optional[str] = None,
    food_type: Optional[str] = None,
):
    data = read_restaurants()
    restaurants = data["restaurants"]

    results = restaurants

    if ethnicity:
        results = [
            r for r in results
            if ethnicity.lower() in [e.lower() for e in r["ethnicity"]]
        ]

    if food_type:
        results = [
            r for r in results
            if food_type.lower() in [f.lower() for f in r["foodTypes"]]
        ]

    return results

@app.get("/restaurants/random")
def random_restaurant(
    ethnicity: Optional[str] = None,
    food_type: Optional[str] = None,
):
    data = read_restaurants()
    restaurants = data["restaurants"]

    filtered = restaurants

    if ethnicity:
        filtered = [
            r for r in filtered
            if ethnicity.lower() in [e.lower() for e in r["ethnicity"]]
        ]

    if food_type:
        filtered = [
            r for r in filtered
            if food_type.lower() in [f.lower() for f in r["foodTypes"]]
        ]

    if not filtered:
        return {"error": "No restaurants found"}

    return random.choice(filtered)

class Restaurant(BaseModel):
    name: str
    ethnicity: List[str]
    foodTypes: List[str]
    price: Optional[str] = ""
    location: Optional[str] = ""
    notes: Optional[str] = ""

@app.post("/restaurants")
def add_restaurant(restaurant: Restaurant):
    data = read_restaurants()

    restaurant_dict = {
        "id": data["next_id"],
        "name": restaurant.name,
        "ethnicity": restaurant.ethnicity,
        "foodTypes": restaurant.foodTypes,
        "price": restaurant.price,
        "location": restaurant.location,
        "notes": restaurant.notes,
    }
    data["next_id"] += 1
    data["restaurants"].append(restaurant_dict)

    write_restaurants(data)
    return {"status": "added", "id": restaurant_dict["id"]}
