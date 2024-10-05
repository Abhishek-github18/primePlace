export const validateUsername = (username) => {
  if (!username) {
    return false;
  }
  const regex = /^[A-Za-z0-9_]{3,16}$/;
  if (regex.test(username)) {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (email) => {
  if (!email) {
    return false;
  }
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  if (regex.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (password) => {
  if (!password) {
    return false;
  }
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (regex.test(password)) {
    return true;
  } else {
    return false;
  }
};
