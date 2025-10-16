import React, { useState, useRef, useEffect } from 'react';
import SparkEDog from '../../components/SparkEDog.jsx';
import { fetchWithAuth, getUserInfo, getAccessToken } from '../../utils/auth';

const CHAT_API = 'http://127.0.0.1:8000/api/users/chat/';

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); // {role: 'user'|'bot', text}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const listRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // scroll to bottom when messages change
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendQuestion(question) {
    if (!question || loading) return;
    setError(null);
    setLoading(true);
    // show user message immediately
    setMessages(prev => [...prev, { role: 'user', text: question }]);

    try {
      // Try authenticated fetch first; fall back to unauthenticated fetch if it fails
      let res;
      // If files are selected, send as multipart/form-data
      if (selectedFiles && selectedFiles.length > 0) {
        const form = new FormData();
        form.append('question', question);
        selectedFiles.forEach((f, i) => form.append('files', f));
        // try fetchWithAuth; it will add Authorization header
        try {
          res = await fetchWithAuth(CHAT_API, { method: 'POST', body: form });
        } catch (e) {
          // fallback plain fetch
          const headers = {};
          const token = getAccessToken();
          if (token) headers['Authorization'] = `Bearer ${token}`;
          res = await fetch(CHAT_API, { method: 'POST', body: form, headers });
        }
      } else {
        try {
          res = await fetchWithAuth(CHAT_API, {
            method: 'POST',
            body: JSON.stringify({ question })
          });
        } catch (e) {
          // fallback to plain fetch (useful during frontend-only mode)
          res = await fetch(CHAT_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
          });
        }
      }

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Server returned ${res.status}`);
      }
      const data = await res.json();
      // API returns { question, answer }
      const answer = data.answer || data.response || 'Sorry, no answer returned.';
      setMessages(prev => [...prev, { role: 'bot', text: answer }]);
    } catch (err) {
      setError(err.message || String(err));
      setMessages(prev => [...prev, { role: 'bot', text: 'An error occurred while fetching the answer.' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSend(e) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput('');
    sendQuestion(q);
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-gray-50 relative">
      {/* Tooltip is now handled in Sidebar on hover of Chat button */}
      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 min-h-[400px] pt-6 pb-4">
        <SparkEDog />
        <div className="flex flex-col items-center mt-4 w-full max-w-3xl">
          <div className="flex gap-4 mb-4">
            <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 text-base font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200">Personalities & Skillsets</button>
            <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 text-base font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200">Scenarios</button>
          </div>
          <h2 className="text-3xl font-extrabold text-indigo-900 my-2">Hi, I'm StudyBuddy</h2>
          <div className="text-gray-500 text-lg mb-6 text-center max-w-xl">Ask me anything about learning, or try one of these examples:</div>

            {/* Messages list */}
            <div ref={listRef} className="w-full bg-white rounded-lg border border-gray-100 p-6 mb-4 max-h-[360px] overflow-auto relative">
              {/* show logged-in username as a pill at top-right like the mock */}
              {(() => {
                const user = getUserInfo();
                if (user && user.username) {
                  return (
                    <div className="absolute right-6 top-4">
                      <div className="bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium">{user.username}</div>
                    </div>
                  );
                }
                return null;
              })()}
            {messages.length === 0 && (
              <div className="text-center text-gray-400 py-12">No messages yet — ask a question to get started.</div>
            )}
            {messages.map((m, idx) => (
              <div key={idx} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900'} ${m.role === 'user' ? 'rounded-lg px-4 py-2' : 'rounded-md px-4 py-3'} max-w-[80%] shadow-sm`}>{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="text-gray-500 text-sm">Thinking...</div>
            )}
          </div>

          <div className="flex gap-4 flex-wrap justify-center mb-2 w-full">
            <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200">Explain Concepts</button>
            <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200">Summarize</button>
            <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200">Find Citations</button>
            <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200">Study Techniques</button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <form onSubmit={handleSend} className="bg-white border-t border-gray-200 px-4 py-6 flex flex-col items-center gap-2 shadow-sm w-full">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-2xl flex items-center gap-3">
            <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 px-5 py-3 rounded-xl border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition" placeholder="Ask your AI tutor anything..." />
            <button type="submit" className="ml-2 bg-indigo-500 text-white rounded-lg px-5 py-3 font-bold text-lg shadow hover:bg-indigo-600 transition">➤</button>
          </div>
        </div>

        <div className="w-full flex justify-center mt-3">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => fileInputRef.current && fileInputRef.current.click()} className="bg-orange-50 text-orange-700 border border-orange-300 rounded-lg px-4 py-2 font-semibold shadow hover:bg-orange-100 transition">Using {selectedFiles.length} material(s) <span className="underline ml-2">Select Materials</span></button>
            <input ref={fileInputRef} type="file" className="hidden" multiple onChange={e => {
              const files = Array.from(e.target.files || []);
              setSelectedFiles(files);
            }} />
            {selectedFiles.length > 0 && (
              <div className="text-sm text-gray-600">
                {selectedFiles.map((f, i) => <div key={i}>{f.name}</div>)}
              </div>
            )}
          </div>
        </div>

        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default ChatPage;
