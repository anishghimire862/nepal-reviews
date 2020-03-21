module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password",
  DB: "nepal_reviews",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}