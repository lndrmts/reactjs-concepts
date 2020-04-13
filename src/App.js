import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post("repositories", {
      title: `New Project ${Date.now()}`,
      url: "http://github.com/lndrmts",
      techs: ["ReactJS", "NodeJS", "React native"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

    var newRepositories = repositories.slice();

    newRepositories.splice(repositoryIndex, 1);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ title, id }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
