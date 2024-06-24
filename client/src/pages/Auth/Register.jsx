import { useState } from 'react';
import AuthService from '../../../facade/services/AuthService.js';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register(name, email, password, profilePicture);
            setName('');
            setEmail('');
            setPassword('');
            setProfilePicture('');
        } catch (error) {
            setError(error.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="text" placeholder="Profile Picture URL" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}