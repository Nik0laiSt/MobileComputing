import React, { useState } from 'react';
import axios from 'axios';

interface LoginFormProps {
    onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null); // Clear previous errors
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password }); 
            if (response.data) {
                onLoginSuccess(); // Erfolgreiche Login-Aktion
            }
            const token = response.data.token;
            localStorage.setItem('jwtToken', token);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.inputGroup}>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div style={styles.inputGroup}>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" style={styles.button}>Login</button>
        </form>
    );
};

export default LoginForm;

const styles = {
    form: {
        maxWidth: '300px',
        margin: '0 auto',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#034875',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    },
};
