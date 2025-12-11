"""
import React, { useState } from 'react';
import api from '../../api/ai';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('access_token');

  const send = async (e) => {
    e && e.preventDefault();
    if (!input) return;
    const userMsg = { from: 'user', text: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    if (!token) {
      setMessages((m) => [...m, { from: 'system', text: 'Please login to use AI chat.' }]);
      return;
    }
    setLoading(true);
    try {
      const resp = await api.sendMessage(token, input);
      const reply = resp.data.reply;
      setMessages((m) => [...m, { from: 'bot', text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { from: 'system', text: 'Error contacting AI service.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth:800, margin:'0 auto'}}>
      <h3>Study Assistant</h3>
      <div style={{border:'1px solid #ddd', padding:12, minHeight:200}}>
        {messages.map((m,i)=> (
          <div key={i} style={{marginBottom:8}}>
            <b>{m.from}:</b> <span>{m.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={send} style={{marginTop:8}}>
        <input value={input} onChange={e=>setInput(e.target.value)} style={{width:'70%'}} />
        <button type="submit" disabled={loading} style={{marginLeft:8}}>{loading ? 'Sending...' : 'Send'}</button>
      </form>
    </div>
  );
}
"""
}]}]