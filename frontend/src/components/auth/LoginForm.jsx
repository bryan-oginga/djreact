import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { login } from '../../services/api/AuthService';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      alert('Invalid credentials',{err});
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <p>
        Don’t have an account? <NavLink to="/register">Register</NavLink>
      </p>
    </form>
  );
}

export default LoginPage;
