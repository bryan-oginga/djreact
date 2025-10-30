import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { register } from '../../services/AuthService';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, username);
      alert('Account created! You can now log in.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed',{err});
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
      <p>
        Already have an account? <NavLink to="/login">Login</NavLink>
      </p>
    </form>
  );
}

export default RegisterPage;
