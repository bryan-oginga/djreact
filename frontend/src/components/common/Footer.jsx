// src/components/common/Footer.jsx
import "../../assets/styles/App.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} MovieApp. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
