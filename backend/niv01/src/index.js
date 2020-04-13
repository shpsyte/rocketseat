const express = require('express')
const app = express();
const { uuid, isUuid } = require('uuidv4')
app.use(express.json());

const projects = [];
 

function logRequest(req, res, next) {
  const { method, url } = req;
  const logLabel = `[${method.toUpperCase()} ${url}]`
  
  
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);


}

function validateProjectId(req, res, next){
  const { id } = req.params;
   if (!isUuid(id)){
    return res.status(400).json({error: 'Id is not valid'})
   }
}


app.use(logRequest);
app.use('/projects/:id',validateProjectId);



app.get('/projects', (req, res) => {
  const { title } = req.query;
  const results = title ? projects.filter(a => a.title.includes(title)) : projects;
  return res.json(results)
})


app.post('/projects', (req, res) => {
   const { title, owner }= req.body;
   const project = { id: uuid(), title, owner }
   projects.push(project);
   return res.json(project);

})


app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title, owner }= req.body;
  const projectIndex = projects.findIndex(a => a.id === id);

  if (projectIndex < 0) {
     return res.status(400).json({error: 'Project not found'})
  }

  const project = {
    id,
    title,
    owner
  }

  projects[projectIndex] = project;

  return res.json(project);
 
})


app.delete('/projects/:id',  (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(a => a.id === id);

  if (projectIndex < 0) {
     return res.status(400).json({error: 'Project not found'})
  }

  projects.splice([projectIndex] ,1);

  return res.status(200).send();

})


app.listen(3333, () => {console.log(`🚀️ Listening on ${3333} `)})