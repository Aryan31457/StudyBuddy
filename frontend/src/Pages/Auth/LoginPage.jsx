import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
// NOTE: Backend currently has issues; the real API calls are commented out below.
// When backend is ready again, re-enable the import and the auth.login/auth.register calls.
import * as auth from '../../utils/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('student');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Real API call (disabled while backend is unstable):
      // await auth.login({ email, password });
      // navigate('/');

      // Simulated successful login for frontend development:
      // Set dummy tokens so ProtectedRoute and fetchWithAuth behave as authenticated.
      localStorage.setItem('studybuddy:access', 'DUMMY_ACCESS_TOKEN');
      localStorage.setItem('studybuddy:refresh', 'DUMMY_REFRESH_TOKEN');
      auth.setUserInfo({ username: email.split('@')[0], email });
      navigate('/');
    } catch (err) {
      setError(err.message || String(err));
    } finally { setLoading(false); }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Real API calls (disabled while backend is unstable):
      // const user = await auth.register({ username, email, role, password, confirm_password: confirmPassword });
      // // after register, log user in
      // await auth.login({ email, password });
      // auth.setUserInfo(user);
      // navigate('/');

      // Simulated successful registration for frontend development:
      const user = { id: 0, username, email, role };
      localStorage.setItem('studybuddy:access', 'DUMMY_ACCESS_TOKEN');
      localStorage.setItem('studybuddy:refresh', 'DUMMY_REFRESH_TOKEN');
      auth.setUserInfo(user);
      navigate('/');
    } catch (err) {
      setError(err.message || String(err));
    } finally { setLoading(false); }
  }

  return (
    <div className="login-page">
      <div className="left-hero">
        <div className="brand">STUDY FETCH</div>
        <h2>92% of students get higher grades with StudyFetch</h2>
        <div className="upload-illustration">📁</div>
        <div className="trusted">Trusted by students from Harvard, Yale, MIT</div>
      </div>

      <div className="login-card">
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={isRegister ? handleRegister : handleLogin} className="login-form">
          {!isRegister && (
            <>
              <button type="button" className="oauth google">Continue with Google</button>
              <button type="button" className="oauth apple">Continue with Apple</button>
              <div className="divider">Or sign in with email</div>
            </>
          )}

          {isRegister && (
            <>
              <label>Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Choose a username" />
              <label>Role</label>
              <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </>
          )}

          <label>Your Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />

          <label>Your Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />

          {isRegister && (
            <>
              <label>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your password" />
            </>
          )}

          {error && <div style={{ color: 'red' }}>{error}</div>}

          <button className="login-btn" type="submit" disabled={loading}>{loading ? 'Please wait...' : (isRegister ? 'Register' : 'Login')}</button>

          <div className="links">
            {isRegister ? (
              <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(false); }}>Login</a></>
            ) : (
              <>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(true); }}>Register</a></>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
