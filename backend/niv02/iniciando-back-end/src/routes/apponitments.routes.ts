import Router from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppoitmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentServices';
import ensureAutheticated from '../middlewares/ensureAutheticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAutheticated);

appointmentsRouter.get('/', (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = appointmentRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });
  return res.json(appointment);
});

export default appointmentsRouter;
