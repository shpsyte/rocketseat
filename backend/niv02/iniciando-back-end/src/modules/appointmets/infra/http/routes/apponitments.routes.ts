import Router from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '@modules/appointmets/infra/typeorm/repositories/AppoitmentsRepository';
import CreateAppointmentService from '@modules/appointmets/services/CreateAppointmentServices';
import ensureAutheticated from '@modules/users/infra/http/middlewares/ensureAutheticated';

const appointmentsRouter = Router();

const appointmentRepository = new AppointmentRepository();

appointmentsRouter.use(ensureAutheticated);

// appointmentsRouter.get('/', (req, res) => {
//   const appointments = appointmentRepository.find();
//   return res.json(appointments);
// });

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(appointmentRepository);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });
  return res.json(appointment);
});

export default appointmentsRouter;
