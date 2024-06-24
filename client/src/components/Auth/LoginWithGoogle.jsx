import { useState } from 'react';
import AuthService from '../../../facade/services/AuthService.js';
import { useNavigate } from 'react-router-dom';

export default function LoginWithGoogle() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        // AuthService.loginWithGoogle();
        try {
            const { token } = await AuthService.loginWithGoogle();
            localStorage.setItem('token', token);
            navigate('/profile');
        } catch (error) {
            setError(error.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            <h2>Login with Google</h2>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            {error && <p>{error}</p>}
        </div>
    );
}
