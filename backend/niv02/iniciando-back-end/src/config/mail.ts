interface IMailConfig {
  driver: 'ethereal' | 'gmail';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };

  gmail: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'jose luiz',
      name: 'Equipe GoBarber',
    },
  },
  gmail: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD_EMAIL,
    },
  },
};
