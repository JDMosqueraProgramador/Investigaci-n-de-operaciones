from typing import Union
from fastapi import FastAPI
from objects.data import (setData, surround_in_array)
from modules import decisions

from objects.body import Body

app = FastAPI()

@app.get("/")
def read_root():
    return { "Hello": "World" }

@app.post("/decisions")
def get_decision(body: Body):
    results = decisions.get_teory(
            alternatives=surround_in_array(body.dict()["matrix"]),
            probabilities=surround_in_array(body.dict()["probabilities"]),
            dependsProbabilities=surround_in_array(body.dict()["depends_probabilities"])
    )

    return results
