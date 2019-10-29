"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("usersevents", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: { model: "events", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false
      },
      canceled_at: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("usersevents");
  }
};
