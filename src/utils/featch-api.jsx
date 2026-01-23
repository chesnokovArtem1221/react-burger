export const BASE_URL = `https://norma.education-services.ru/api`;
export const INGREDIENT = BASE_URL + `/ingredients`;
export const ORDER = BASE_URL + '/orders';

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredientsAPI = () => {
  return fetch(INGREDIENT).then(getResponse);
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
