from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Dummy-Daten
todos = []
events = []

# CORS für Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Datenmodelle
class Todo(BaseModel):
    id: int
    title: str
    done: bool = False

class Event(BaseModel):
    id: int
    title: str
    date: str  # z.B. "2025-06-23"

# Routen
@app.get("/")
def read_root():
    return {"message": "Planify API"}

@app.get("/todos", response_model=List[Todo])
def get_todos():
    return todos

@app.post("/todos", response_model=Todo)
def create_todo(todo: Todo):
    todos.append(todo)
    return todo

@app.get("/events", response_model=List[Event])
def get_events():
    return events

@app.post("/events", response_model=Event)
def create_event(event: Event):
    events.append(event)
    return event
