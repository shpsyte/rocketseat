import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.json({ massge: 'Hello ...teste jose ...' }));

export default routes;
