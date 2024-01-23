const BASE_URL = 'http://localhost:8080';

// possible to refactor into a 'fetch factory' to reduce repetition

const apiService = {};

apiService.register = async (user) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

apiService.login = async (user) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

apiService.profile = async () => {
  try {
    const res = await fetch(`${BASE_URL}/me`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

apiService.logout = async () => {
  try {
    const res = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

export default apiService;
