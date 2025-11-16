const config = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
  dbName: process.env.DB_NAME || 'Portfolio',
  jwtSecret: process.env.JWT_SECRET || 'dev_jwt_secret',
};
export default config;
