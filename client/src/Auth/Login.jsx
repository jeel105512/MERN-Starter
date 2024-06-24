import { useState } from 'react'
import AuthService from '../../../facade/services/AuthService.js';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { token } = await AuthService.login(email, password);
            localStorage.setItem('token', token);
            navigate('/profile'); // Redirect to profile or dashboard page
        } catch (error) {
            setError(error.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}
