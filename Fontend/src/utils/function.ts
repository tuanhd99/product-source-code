export const getFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};
export const saveToLocalStorage = (key: string, value?: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};
