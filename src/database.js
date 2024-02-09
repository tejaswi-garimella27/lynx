import mysql from "mysql2/promise.js";
import { ENV } from "./constants.js";

const dbConnectionConfig = {
  host: ENV.HOST,
  port: Number(ENV.PORT || 4001),
  user: ENV.USERNAME,
  password: ENV.PASSWORD,
  database: ENV.DATABASE,
};

/** Connect to the Database with the config */
const connectDatabase = async (dbConnectionConfig) => {
  const connection = await mysql.createConnection(dbConnectionConfig);
  if (!connection) throw err;
  console.log("Database connected");
  return connection;
};

const db = await connectDatabase(dbConnectionConfig);

export default db;
