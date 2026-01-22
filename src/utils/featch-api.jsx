export const BASE_URL = `https://norma.education-services.ru/api/ingredients`;
export const ORDER = 'https://norma.education-services.ru/api/orders';

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredientsAPI = () => {
  return fetch(BASE_URL).then(getResponse);
};

export const addOrder = (ingredients) => {
  return fetch(ORDER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  }).then(getResponse);
};
