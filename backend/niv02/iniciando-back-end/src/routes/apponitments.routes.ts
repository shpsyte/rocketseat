import Router from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository, RelationCount } from 'typeorm';
import AppointmentRepository from '../repositories/AppoitmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentServices';

const appointmentsRouter = Router();

const routes = Router();

appointmentsRouter.get('/', (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = appointmentRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    });
    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
