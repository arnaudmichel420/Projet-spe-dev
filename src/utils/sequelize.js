const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  logging: false,
}); // Example for postgres

(async () => {
  try {
    await sequelize.authenticate();

    console.log("Connection has been established successfully.");
    // await sequelize.sync({
    //   // alter: true,
    //   force: true,
    // });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
