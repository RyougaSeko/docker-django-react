import { API_BASE_URL } from '../constants';

export const fetchItems = () => {
  return fetch(`${API_BASE_URL}/items/`)
    .then(response => response.json());
};

export const createItem = (newItem) => {
  return fetch(`${API_BASE_URL}/items/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  })
  .then(response => response.json());
};

export const updateItem = (id, item) => {
  return fetch(`${API_BASE_URL}/items/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
  .then(response => response.json());
};

export const deleteItem = (id) => {
  return fetch(`${API_BASE_URL}/items/${id}/`, {
    method: 'DELETE',
  })
  .then(response => response.json());
};