import express  from 'express'
import helloWorld from './routes';


const app = express();

app.get('/', (req, res) => {
  return helloWorld;
})

app.listen(3333)
