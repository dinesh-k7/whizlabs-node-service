export default (): any => ({
  PORT: parseInt(process.env.PORT, 10) || 3020,
  NODE_ENV: process.env.NODE_ENV || 'dev',
  ENABLE_CORS: true,
  RATE_LIMIT: {
    max: 100,
    minutes: 10,
  },
  ADMIN_USERNAME: 'admin',
  ADMIN_PASSWORD: 'Whiz123@',
});
