export default {
  jwt: {
    secret: process.env.APP_SECRET || 'defautlt',
    expiresIn: '1d',
  },
};
