import React, { Fragment, useState, useEffect } from 'react'
import Header from './Header'
import './App.css'
import backGrouinImg from './assets/dog.jpg'
import api from './services/api'

 


function App () {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
      api.get('projects').then(res => {
        setProjects(res.data);
      })

  }, [])

  async function handleAddProject() {
    //  setProjects([...projects, `Novo Projeto  ${Date.now()}`])

     const res = await api.post('projects',{
      "title": `Novo Projeto  ${Date.now()}`,
      "owner": "Jose Luiz"
    });
 
    setProjects([...projects, res.data] ); 
  }

  return (
     <>
        <Header title="Homepage"/>

        <img width="300" src={backGrouinImg} alt=""/>
        <ul>
             {projects.map(a => (
              <li key={a.id}>{a.title}</li>
            ))} 
         </ul>
         <button type="button" onClick={handleAddProject}>Adicionar</button>
     </>
    )

}


export default App;