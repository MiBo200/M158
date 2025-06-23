import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    axios.get(`${API}/todos`).then(res => setTodos(res.data));
    axios.get(`${API}/events`).then(res => setEvents(res.data));
  }, []);

  const addTodo = () => {
    axios.post(`${API}/todos`, {
      id: Date.now(),
      title,
      done: false,
    }).then(res => setTodos([...todos, res.data]));
    setTitle("");
  };

  const addEvent = () => {
    axios.post(`${API}/events`, {
      id: Date.now(),
      title: eventTitle,
      date: eventDate,
    }).then(res => setEvents([...events, res.data]));
    setEventTitle("");
    setEventDate("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>📝 Planify</h1>

      <h2>ToDo Liste</h2>
      <input
        placeholder="Neue Aufgabe..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={addTodo}>Hinzufügen</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title} {todo.done ? "✅" : ""}</li>
        ))}
      </ul>

      <h2>Kalender</h2>
      <input
        placeholder="Terminname"
        value={eventTitle}
        onChange={e => setEventTitle(e.target.value)}
      />
      <input
        type="date"
        value={eventDate}
        onChange={e => setEventDate(e.target.value)}
      />
      <button onClick={addEvent}>Hinzufügen</button>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.date} – {event.title}</li>
        ))}
      </ul>
    </div>
  );
}
