import { DataTypes, NOW, QueryInterface } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("movie", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tmdbId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      releaseDate: DataTypes.DATEONLY,
      poster: DataTypes.STRING,
      overview: DataTypes.STRING,
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
