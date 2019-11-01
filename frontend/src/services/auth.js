export const TOKEN_KEY = "@iatec-Token";
export const TOKEN_ID = "@iatec-Id";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getId = () => localStorage.getItem(TOKEN_ID);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const saveId = id => {
  localStorage.setItem(TOKEN_ID, id);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_ID);
};
