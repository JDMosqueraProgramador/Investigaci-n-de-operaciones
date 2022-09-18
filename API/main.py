from typing import Union
from fastapi import FastAPI

from objects.body import Body

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/decisions")
def get_decision(body: Body):
    return {"good": body.dict()}