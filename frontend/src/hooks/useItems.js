import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';

export const useItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/items/`)
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const createItem = (newItem) => {
    return fetch(`${API_BASE_URL}/items/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(data => {
      setItems(currentItems => [...currentItems, data]);
    });
  };

  const updateItem = (id, item) => {
    return fetch(`${API_BASE_URL}/items/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    .then(response => response.json())
    .then(updatedItem => {
      setItems(currentItems => currentItems.map(i => i.id === id ? updatedItem : i));
    });
  };

  const deleteItem = (id) => {
    return fetch(`${API_BASE_URL}/items/${id}/`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
      setItems(currentItems => currentItems.filter(i => i.id !== id));
    });
  };

  return { items, loading, error, createItem, updateItem, deleteItem };
};