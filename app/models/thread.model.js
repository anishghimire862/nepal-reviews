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
    creator: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.DATE
    }
  });
  return Thread;
};
