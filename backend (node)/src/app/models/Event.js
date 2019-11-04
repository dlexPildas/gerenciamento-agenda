const { Model } = require("sequelize");
const Sequelize = require("sequelize");

class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        date_event: Sequelize.DATE,
        date_event_final: Sequelize.DATE,
        place: Sequelize.STRING,
        category: Sequelize.STRING
      },
      {
        sequelize,
        tableName: "events"
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "owner", as: "user_owner" });
    this.belongsToMany(models.User, {
      foreignKey: "event_id",
      as: "users",
      through: "event_users"
    });
  }
}

module.exports = Event;
