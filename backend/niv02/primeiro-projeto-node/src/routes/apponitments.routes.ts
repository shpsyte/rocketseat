import Router from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppoitmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentServices';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentRepository.all();

  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentRepository
    );

    const appointment = createAppointmentService.execute({
      date: parsedDate,
      provider,
    });
    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
