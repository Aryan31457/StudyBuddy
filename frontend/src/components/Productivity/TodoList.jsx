import React, { useEffect, useState } from 'react';
import api from '../../api/productivity';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const token = localStorage.getItem('access_token');

  const load = async () => {
    if (!token) return;
    const resp = await api.fetchTodos(token);
    setTodos(resp.data);
  };

  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e && e.preventDefault();
    if (!title) return;
    await api.createTodo(token, { title });
    setTitle('');
    load();
  };

  const toggle = async (t) => {
    await api.updateTodo(token, t.id, { completed: !t.completed });
    load();
  };

  const remove = async (t) => {
    await api.deleteTodo(token, t.id);
    load();
  };

  return (
    <div>
      <h3>To-dos</h3>
      <form onSubmit={add}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(t=>(
          <li key={t.id}>
            <input type="checkbox" checked={t.completed} onChange={()=>toggle(t)} />
            <strong>{t.title}</strong> {t.due_date ? <small>due {new Date(t.due_date).toLocaleString()}</small> : null}
            <button onClick={()=>remove(t)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
