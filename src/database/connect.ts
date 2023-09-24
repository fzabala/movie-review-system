import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Dialect, Transaction } from "sequelize";
import { MovieModel, ReviewModel } from "../models";

let sequelize: Sequelize;

export async function connect(): Promise<Sequelize> {
  try {
    console.log("Starting database connection...", "START_DB", {
      uri: process.env.DB_NAME,
    });

    const options: SequelizeOptions = {
      dialect: process.env.DB_DIALECT as Dialect,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOSTNAME,
      storage: process.env.DB_STORAGE,
      logging: false,
      omitNull: false,
      models: [MovieModel, ReviewModel],
      logQueryParameters: true,
    };

    sequelize = new Sequelize(options);

    console.log("Validate connection...", "START_DB", {
      uri: process.env.DB_NAME,
    });
    await sequelize.authenticate();
    console.log("Connection success!", "START_DB", {
      uri: process.env.DB_NAME,
    });

    if (process.env.NODE_ENV === "test") {
      await sequelize.sync({ force: true });
      //await testSeeders(sequelize);
    }

    return Promise.resolve(sequelize);
  } catch (e) {
    console.error(new Error("Unable to connect to the database"));
    return Promise.reject({
      message: "Unable to connect to the database",
      stack: e.stack,
    });
  }
}

export async function transaction(): Promise<Transaction> {
  return sequelize.transaction();
}

export async function close(): Promise<void> {
  console.log("Closing database connection...", "CLOSE_DB", {
    uri: process.env.DB_NAME,
  });
  return sequelize.close();
}
