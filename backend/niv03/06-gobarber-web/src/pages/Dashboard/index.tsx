import React, { useState, useCallback } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
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

const Dashboard: React.FC = () => {
  const [selectdDate, setSelectedDate] = useState(new Date());

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);
  const { sigOut, user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logImg} alt="" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo,</span>
              <strong>{user.name}</strong>
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
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="http://localhost:3333/files/5559f33e0e785528c12e-0.jpeg"
                alt=""
              />
              <strong>Jose Luiz</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>manhã</strong>
            <Appointment>
              <span>
                <FiClock /> 08:00{' '}
              </span>
              <div>
                <img
                  src="http://localhost:3333/files/5559f33e0e785528c12e-0.jpeg"
                  alt=""
                />
                <strong>Jose Luiz</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock /> 08:00{' '}
              </span>
              <div>
                <img
                  src="http://localhost:3333/files/5559f33e0e785528c12e-0.jpeg"
                  alt=""
                />
                <strong>Jose Luiz</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>tarde</strong>
            <Appointment>
              <span>
                <FiClock /> 08:00{' '}
              </span>
              <div>
                <img
                  src="http://localhost:3333/files/5559f33e0e785528c12e-0.jpeg"
                  alt=""
                />
                <strong>Jose Luiz</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectdDate}
            onDayClick={handleDateChange}
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
