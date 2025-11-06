import "../../assets/styles/auth.css";
function RegisterForm({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
  loading,
  error,
}) {
  return (
    <form className="register-form" onSubmit={onSubmit}>
      <h2>Create Account</h2>

      {error && <div className="error-message">{error}</div>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        minLength={8}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}

export default RegisterForm;
