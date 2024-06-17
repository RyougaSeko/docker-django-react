import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';

function TodoApp() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch(`${API_BASE_URL}/items/`)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevState => ({ ...prevState, [name]: value }));
  };

  const createItem = () => {
    fetch(`${API_BASE_URL}/items/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
    .then(response => response.json())
    .then(() => {
      fetchItems();
      setNewItem({ name: '', description: '' }); // フォームをリセット
    })
    .catch(error => console.error('Error creating item:', error));
  };

  const handleItemChange = (e, id) => {
    const { name, value } = e.target;
    setItems(items.map(item => item.id === id ? { ...item, [name]: value } : item));
  };

  const saveItem = (id) => {
    const item = items.find(item => item.id === id);
    fetch(`${API_BASE_URL}/items/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
    .then(response => response.json())
    .then(() => fetchItems())
    .catch(error => console.error('Error updating item:', error));
  };

  const deleteItem = (id) => {
    // DELETEリクエストを送るための関数
    fetch(`${API_BASE_URL}/items/${id}/`, {
      method: 'DELETE',
    })
    .then(() => fetchItems()) // アイテムを再取得
    .catch(error => console.error('Error deleting item:', error));
  };
  return (
    <div className="container mx-auto mt-10">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-6">SAMPLE TODO APP</h1>
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            placeholder="タスク"
            className="form-input px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="description"
            value={newItem.description}
            onChange={handleInputChange}
            placeholder="詳細"
            className="form-input px-4 py-2 border rounded"
          />
          <button onClick={createItem} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            アイテムを作成
          </button>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">タスク</th>
              <th className="px-4 py-2">詳細</th>
              <th className="px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="text-center">
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(e) => handleItemChange(e, item.id)}
                    className="form-input px-4 py-2 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={(e) => handleItemChange(e, item.id)}
                    className="form-input px-4 py-2 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <button onClick={() => saveItem(item.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2">
                    保存
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                    完了
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default TodoApp;