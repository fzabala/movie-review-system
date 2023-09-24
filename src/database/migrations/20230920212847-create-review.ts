import { DataTypes, NOW, QueryInterface } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("review", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      movieId: {
        type: DataTypes.INTEGER,
        references: {
          model: "movie",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: NOW,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("role");
  },
};
