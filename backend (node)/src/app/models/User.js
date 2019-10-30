const { Model } = require("sequelize");

const bcrypt = require("bcrypt");

const Sequelize = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING
      },
      {
        sequelize,
        tableName: "users"
      }
    );

    this.addHook("beforeSave", async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Event, {
      foreignKey: "user_id",
      as: "events",
      through: "event_users"
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;
