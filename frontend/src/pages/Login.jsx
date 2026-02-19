import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const BASE = 'http://localhost:3000/api/reqFlights';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [msg, setMsg] = useState(null);  // { type: 'success'|'error', text }
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
            const res = await axios.post(`${BASE}/auth/login`, form);
            const username = res.data.user?.username || 'traveler';
            setMsg({ type: 'success', text: `Welcome back, ${username}! ✈️` });
            login({ username });
            setTimeout(() => navigate('/'), 1800);
        } catch (err) {
            setMsg({ type: 'error', text: err.response?.data?.message || 'Login failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <button className="auth-back" onClick={() => navigate(-1)}>← Back</button>
                <div className="auth-logo">✈</div>
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-sub">Sign in to your NMFlights account</p>

                {msg && (
                    <div className={`auth-msg ${msg.type}`}>{msg.text}</div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="auth-btn primary" type="submit" disabled={loading}>
                        {loading ? 'Signing in…' : 'Login'}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{' '}
                    <Link to="/signup" className="auth-link">Sign up free</Link>
                </p>
            </div>
        </div>
    );
}