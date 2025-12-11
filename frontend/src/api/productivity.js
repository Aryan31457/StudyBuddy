import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_URL || '/api';

export const fetchTodos = (token, params={}) =>
  axios.get(`${API_BASE}/productivity/todos/`, { headers: { Authorization: `Bearer ${token}` }, params });

export const createTodo = (token, data) =>
  axios.post(`${API_BASE}/productivity/todos/`, data, { headers: { Authorization: `Bearer ${token}` } });

export const updateTodo = (token, id, data) =>
  axios.put(`${API_BASE}/productivity/todos/${id}/`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTodo = (token, id) =>
  axios.delete(`${API_BASE}/productivity/todos/${id}/`, { headers: { Authorization: `Bearer ${token}` } });

// Flashcards
export const fetchFlashcards = (token, params={}) =>
  axios.get(`${API_BASE}/productivity/flashcards/`, { headers: { Authorization: `Bearer ${token}` }, params });

export const createFlashcard = (token, data) =>
  axios.post(`${API_BASE}/productivity/flashcards/`, data, { headers: { Authorization: `Bearer ${token}` } });

export const reviewFlashcard = (token, cardId, quality) =>
  axios.post(`${API_BASE}/productivity/flashcards/review/`, { card_id: cardId, quality }, { headers: { Authorization: `Bearer ${token}` } });

export default {
  fetchTodos, createTodo, updateTodo, deleteTodo,
  fetchFlashcards, createFlashcard, reviewFlashcard
};
