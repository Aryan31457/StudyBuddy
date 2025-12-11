import React, { useState } from 'react';
import api from '../../api/productivity';

export default function FlashcardCreate({ onCreated }) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const token = localStorage.getItem('access_token');

  const submit = async (e) => {
    e && e.preventDefault();
    if (!front || !back) return;
    await api.createFlashcard(token, { front, back });
    setFront(''); setBack('');
    onCreated && onCreated();
  };

  return (
    <form onSubmit={submit}>
      <h4>Create Flashcard</h4>
      <textarea value={front} onChange={e=>setFront(e.target.value)} placeholder="Front" />
      <textarea value={back} onChange={e=>setBack(e.target.value)} placeholder="Back" />
      <button type="submit">Create</button>
    </form>
  );
}
