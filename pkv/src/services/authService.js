export const loginUser = (email, password) => {
  // dummy response (replace with backend API later)
  if (email && password) {
    return { token: "dummy-token" };
  }
  return null;
};
