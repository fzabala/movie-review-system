// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({
  path: `.env${
    process.env.NODE_ENV === "development" ? "" : "." + process.env.NODE_ENV
  }`,
});
import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { addRoutes } from "./setup";
import { connect } from "./database";

// Create an Express application
const app: Express = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

addRoutes(app);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    return next();
  }
  res.status(500).json({ error: "Something went wrong!" });
});

if (process.env.NODE_ENV !== "test") {
  // Start the Express server
  const PORT: number = (process.env.PORT || 3000) as number;
  app.listen(PORT, async () => {
    await connect();
    console.log(`Server is running on port ${PORT}`);
  });
}
export { app };
