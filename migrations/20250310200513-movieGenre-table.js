"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("movie_genre", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      movie_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "movies",
          key: "id",
        },
        allowNull: false,
      },
      genre_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "genres",
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    });
    await queryInterface.addIndex("movie_genre", ["movie_id", "genre_id"], {
      indicesType: "UNIQUE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("movie_genre");
  },
};
