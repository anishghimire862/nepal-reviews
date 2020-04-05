module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return User;
};
