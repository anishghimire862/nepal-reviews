module.exports = (sequelize, Sequelize) => {
  const ThreadImages = sequelize.define("thread_images", {
    image: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    },
    threadId: {
      type: Sequelize.INTEGER
    }
  });
  return ThreadImages;
};
