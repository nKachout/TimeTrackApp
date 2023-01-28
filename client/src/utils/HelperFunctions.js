export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUserFromStorage = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
export const setToken = (val) => {
  localStorage.setItem("token", val);
};

export const authHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return { 'x-auth-token': token };
  } else {
    return {};
  }
}