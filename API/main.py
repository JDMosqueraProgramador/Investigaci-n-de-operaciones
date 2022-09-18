from typing import Union
from fastapi import FastAPI
from objects.data import (setData, surround_in_array)
from modules import decisions
from fastapi.middleware.cors import CORSMiddleware
from objects.body import Body

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return { "Hello": "World" }

@app.post("/decisions")
def get_decision(body: Body):

    print(body.dict())
    results = decisions.get_teory(
            alternatives=surround_in_array(body.dict()["matrix"]),
            probabilities=surround_in_array(body.dict()["probabilities"]),
            dependsProbabilities=surround_in_array(body.dict()["depends_probabilities"])
    )

    return results
