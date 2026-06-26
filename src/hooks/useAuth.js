import useAuthStore from '../store/authStore';

function useAuth() {
  const { user, token, isAuthenticated, login, logout, setUser } = useAuthStore();

  const handleLogin = (token, user) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    login(token, user);
  };

  const handleLogout = () => {
    logout();
  };

  return {
    user,
    token,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    setUser,
  };
}

export default useAuth;
