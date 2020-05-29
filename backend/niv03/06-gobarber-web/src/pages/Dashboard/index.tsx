import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import ptBR from 'date-fns/locale/pt-BR';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Schedule,
  Content,
  NextAppointment,
  Calendar,
  Section,
  Appointment,
} from './styles';
import logImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface ImonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Iappointments {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { sigOut, user } = useAuth();
  const [selectdDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Iappointments[]>([]);
  const [monthAvailability, setmonthAvailability] = useState<
    ImonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((res) => {
        setmonthAvailability(res.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Iappointments[]>('/appointments/me', {
        params: {
          year: selectdDate.getFullYear(),
          month: selectdDate.getMonth() + 1,
          day: selectdDate.getDate(),
        },
      })
      .then((res) => {
        const appointmentFormatted = res.data.map((a) => {
          return {
            ...a,
            hourFormatted: format(parseISO(a.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentFormatted);
      });
  }, [selectdDate]);

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectdDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectdDate]);

  const selectedWeekText = useMemo(() => {
    return format(selectdDate, 'cccc', {
      locale: ptBR,
    });
  }, [selectdDate]);

  const mornigAppointmensts = useMemo(() => {
    return appointments.filter((a) => {
      return parseISO(a.date).getHours() < 12;
    });
  }, [appointments]);

  const afterAppointmensts = useMemo(() => {
    return appointments.filter((a) => {
      return parseISO(a.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find((a) => isAfter(parseISO(a.date), new Date()));
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logImg} alt="" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={sigOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horarios Agendados</h1>
          <p>
            {isToday(selectdDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekText}</span>
          </p>
          {isToday(selectdDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}
          <Section>
            <strong>manhã</strong>
            {mornigAppointmensts.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}
            {mornigAppointmensts.map((a) => (
              <Appointment key={a.id}>
                <span>
                  <FiClock />
                  {a.hourFormatted}
                </span>
                <div>
                  <img src={a.user.avatar_url} alt={a.user.name} />
                  <strong>{a.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <strong>tarde</strong>
            {afterAppointmensts.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}
            {afterAppointmensts.map((a) => (
              <Appointment key={a.id}>
                <span>
                  <FiClock />
                  {a.hourFormatted}
                </span>
                <div>
                  <img src={a.user.avatar_url} alt={a.user.name} />
                  <strong>{a.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectdDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            months={[
              'Jan',
              'Fev',
              'Mar',
              'Abr',
              'Mai',
              'Jun',
              'Jul',
              'Ago',
              'Set',
              'Out',
              'Nov',
              'Dez',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
