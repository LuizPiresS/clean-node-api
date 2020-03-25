export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT || 1313,
  jwtSecret: process.env.JWT_SECRET || 'chavesecretajwt'
}
