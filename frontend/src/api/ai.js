"""
import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_URL || '/api';

export const sendMessage = (token, message) => {
  return axios.post(`${API_BASE}/ai-chat/`, { message }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export default { sendMessage };
"""
