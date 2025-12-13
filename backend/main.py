from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = Path(__file__).parent / "restaurants.json"

@app.get("/restaurants/random")
def get_restaurants():
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    return random.choice(data)
