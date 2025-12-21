from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import random
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = Path(__file__).parent / "restaurants.json"

with open(DATA_FILE, "r") as f:
    ALL_RESTAURANTS = json.load(f)

remaining_restaurants = []


def get_random_restaurant():
    global remaining_restaurants

    if not remaining_restaurants:
        remaining_restaurants = ALL_RESTAURANTS.copy()
        random.shuffle(remaining_restaurants)

    return remaining_restaurants.pop()


@app.get("/restaurants/random")
def random_restaurant():
    return get_random_restaurant()
