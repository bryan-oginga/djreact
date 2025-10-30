import { useEffect, useState } from 'react';
import { getProfile, logout } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
        logout();
        navigate('/login');
      }
    };
    fetchProfile();
  }, [navigate]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Welcome, {profile.username || profile.email}</h2>
      <p>Email: {profile.email}</p>
      <button onClick={() => { logout(); navigate('/login'); }}>
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
