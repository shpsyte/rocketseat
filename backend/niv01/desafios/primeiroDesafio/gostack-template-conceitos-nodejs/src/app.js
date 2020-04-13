const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];



function handleNotFound (req, res, next) {
  const { id } = req.params;
  const repositoryIndex = repositories.findIndex(a => a.id === id);

  if (repositoryIndex < 0 )
     return res.status(400).send({error: 'Repository not found!'});

     return next();
}

app.use('/repositories/:id', handleNotFound)

handleGetRepositoryByIdex = id => repositories.findIndex(a => a.id === id);


app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);
  return response.json(repository);

  
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title,  url , techs, } = request.body;
  const repositoryIndex = handleGetRepositoryByIdex(id);

  const repository = {title,  url , techs, id, likes: repositories[repositoryIndex].likes, };
  repositories[repositoryIndex] = repository;
  
  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = handleGetRepositoryByIdex(id);
  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();


});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = handleGetRepositoryByIdex(id);
  repositories[repositoryIndex].likes ++;

  return response.json(repositories[repositoryIndex]);

});
 

module.exports = app;
