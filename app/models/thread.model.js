module.exports = (sequelize, Sequelize) => {
  const Thread = sequelize.define("thread", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    }
  });
  return Thread;
};
