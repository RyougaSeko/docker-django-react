import React, { useState, useEffect } from 'react';
import '../App.css';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // # TODO: 定数でURLを管理する
    fetch('http://localhost:8080/api/items/')
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Items</h1>
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.name}｜{item.description}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;