const { Model } = require("sequelize");
const Sequelize = require("sequelize");

class UserEvent extends Model {
  static init(sequelize) {
    super.init(
      {
        canceled_at: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    this.belongsTo(models.Event, { foreignKey: "event_id", as: "event" });
  }
}

module.exports = UserEvent;
