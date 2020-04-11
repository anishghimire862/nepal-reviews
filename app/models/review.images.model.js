module.exports = (sequelize, Sequelize) => {
  const ReviewImages = sequelize.define("review_images", {
    image: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    },
    reviewId: {
      type: Sequelize.INTEGER
    }
  });
  return ReviewImages;
};
