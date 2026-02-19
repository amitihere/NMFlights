import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const BASE = 'http://localhost:3000/api/reqFlights';

export default function Signup() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ username: '', email: '', phone: '', password: '' });
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg(null);
        setLoading(true);
        try {
            await axios.post(`${BASE}/auth/signup`, form);
            setMsg({ type: 'success', text: `Account created! Welcome aboard, ${form.username}! ✈️` });
            login({ username: form.username });
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setMsg({ type: 'error', text: err.response?.data?.message || 'Signup failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <button className="auth-back" onClick={() => navigate(-1)}>← Back</button>
                <div className="auth-logo">✈</div>
                <h1 className="auth-title">Join NMFlights</h1>
                <p className="auth-sub">Create your free account today</p>

                {msg && (
                    <div className={`auth-msg ${msg.type}`}>{msg.text}</div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="e.g. john_doe"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

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
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="+91 9876543210"
                            value={form.phone}
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
                            minLength={6}
                        />
                    </div>

                    <button className="auth-btn primary" type="submit" disabled={loading}>
                        {loading ? 'Creating account…' : 'Sign Up'}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account?{' '}
                    <Link to="/login" className="auth-link">Login here</Link>
                </p>
            </div>
        </div>
    );
}
