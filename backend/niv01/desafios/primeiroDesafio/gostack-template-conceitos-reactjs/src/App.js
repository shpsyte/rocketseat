import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setProjects(res.data);
    })
  }, [])

  async function handleAddRepository() {
    const res = await api.post('repositories',{
      title: `Novo Projeto  ${Date.now()}`,
      url: 'https/ggogle',
      techs: []
    });
 
    setProjects([...projects, res.data] ); 
  }
  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);
    
    setProjects(projects.filter(a => a.id !== id) ); 
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {projects.map(a => (
              <li key={a.id}>
                    {a.title}
                    <button onClick={() => handleRemoveRepository(a.id)}>
                      Remover
                    </button>
          </li>
            ))} 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
