import React, { useState, useEffect } from "react";

import api from "services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(res => {      
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      title: "Go Stack RocketSeat",
      url: "https://github.com/d-rocha/",
      techs: ["Javascript ", "Node.js ", "React.js ", "React Native"]
    });

    const repository = res.data;

    setRepositories([...repositories, repository]); 
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(
          repository => <li key={repository.id}>
          <h3>{repository.title}</h3>
                  
          <span>{repository.url}</span>
          
          <span>{repository.techs}</span>

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
