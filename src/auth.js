export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};
export const isAdmin = () => {
   const role = localStorage.getItem('role');
  return role && role.includes('ADMIN');
};
