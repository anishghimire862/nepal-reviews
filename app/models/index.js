// sequelize config
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.threads = require("./thread.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.reviews = require("./review.model.js")(sequelize, Sequelize);
db.ratings = require("./rating.model.js")(sequelize, Sequelize);
db.threadImages = require("./thread.images.model.js")(sequelize, Sequelize);
db.reviewImages = require("./review.images.model.js")(sequelize, Sequelize);

db.reviews.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'users'
});

db.users.hasMany(db.reviews, {
  foreignKey: 'userId',
  as: 'reviews'
});

db.threads.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'users'
});

db.users.hasMany(db.threads, {
  foreignKey: 'userId',
  as: 'threads'
});
  
db.ratings.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'users'
});

db.users.hasMany(db.ratings, {
  foreignKey: 'userId',
  as: 'ratings'
});

db.threads.hasMany(db.threadImages, {
  foreignKey: 'threadId'
});

db.threadImages.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'users'
});

db.reviews.hasMany(db.reviewImages, {
  foreignKey: 'reviewId'
});

db.reviewImages.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'users'
});

db.threads.hasMany(db.reviews, {
  foreignKey: 'threadId'
});

db.threads.hasMany(db.ratings, {
  foreignKey: 'threadId'
});

module.exports = db;