module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("review", {
    description: {
      type: Sequelize.STRING
    },
    creator: {
      type: Sequelize.STRING
    },
    threadId: {
      type: Sequelize.INTEGER
    }
  });
  return Review;
};
