import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export default function helloWorld(req: Request, res: Response) {
  const user = createUser({
    email: 'jose@jose.com',
    password: 1457,
    techs: ['Node','ReactJs', 'React Native', { title: 'Java', experience: 100}]
  });

  
  return res.json(user)
}
