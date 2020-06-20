const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const {title, url, techs } = request.body;

    const repository = {
      id: uuid(),
      title, 
      url,
      techs,
      likes: 0,
    };

    repositories.push(repository);
    return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const {title, url, techs } = request.body;
  const Index = repositories.findIndex((repository) => repository.id === id )

  if(Index === -1)  {
    return response.status(400).json();
  }
 const repository = repositories[Index]
 repository.title = title;
 repository.url = url;
 repository.techs = techs;
 repositories[Index] = repository
 return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  const Index = repositories.findIndex((repository) => repository.id === id )

  if(Index === -1)  {
    return response.status(400).json();
  }
  repositories.splice(Index, 1);
  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const Index = repositories.findIndex(repository => repository.id === id )

  if(Index === -1)  {
    return response.status(400).json();
  }
  const repository = repositories[Index]
  repository.likes ++
  repositories[Index] = repository
  return response.json(repository)


});

module.exports = app;
