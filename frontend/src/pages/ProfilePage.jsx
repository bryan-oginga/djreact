import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, logout } from '../services/AuthService';
import '../assets/styles/auth.css';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div style={{ textAlign: 'center', color: 'white', fontSize: '24px' }}>
          <div className="spinner" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white', width: '40px', height: '40px', margin: '0 auto' }}></div>
          <p style={{ marginTop: '20px' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const getInitial = (email) => email.charAt(0).toUpperCase();

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {getInitial(user.email)}
          </div>
          <h2>My Profile</h2>
        </div>
        
        <div className="profile-body">
          <div className="profile-info">
            <div className="profile-label">Email Address</div>
            <div className="profile-value">{user.email}</div>
          </div>
          
          <div className="profile-info">
            <div className="profile-label">Role</div>
            <div className="profile-value">{user.role || 'User'}</div>
          </div>
          
          <div className="profile-info">
            <div className="profile-label">Member Since</div>
            <div className="profile-value">
              {new Date(user.date_joined).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
          
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;