import Router from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import AppointmentController from '@modules/appointmets/infra/http/controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(ensureAutheticated);

// appointmentsRouter.get('/', (req, res) => {
//   const appointments = appointmentRepository.find();
//   return res.json(appointments);
// });

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
