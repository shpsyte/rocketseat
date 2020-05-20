import Router from 'express';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import AppointmentController from '@modules/appointmets/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointmets/infra/http/controllers/ProviderAppointmentsController';
import { celebrate, Segments, Joi } from 'celebrate';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAutheticated);

// appointmentsRouter.get('/', (req, res) => {
//   const appointments = appointmentRepository.find();
//   return res.json(appointments);
// });

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentController.create
);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
