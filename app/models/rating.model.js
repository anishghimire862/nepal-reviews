module.exports = (sequelize, Sequelize) => {
  const Rating = sequelize.define("rating", {
    threadId: {
      type: Sequelize.INTEGER
    },
    star: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    }
  });

  return Rating;
};
