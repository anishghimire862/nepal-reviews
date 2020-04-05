module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("review", {
    description: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    },
    threadId: {
      type: Sequelize.INTEGER
    }
  });
  return Review;
};
