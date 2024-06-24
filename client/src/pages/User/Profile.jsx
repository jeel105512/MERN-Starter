import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/protected/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
                setUser(response.data.user);
            } catch (error) {
                console.error('Profile fetch error:', error);
                navigate("/login");
            }
        };
        fetchProfile();
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            {user ? (
                <div>
                    <p>ID: {user._id}</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}