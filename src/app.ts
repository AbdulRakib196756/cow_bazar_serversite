import express, { Request, Response, Application, NextFunction } from "express";

import cors from "cors";

import routes from "./app/Routes";
import httpStatus from "http-status";
import cookieparser from "cookie-parser";
import golbalerrorhandler from "./app/middleware/globalerrorhandlar";

const app: Application = express();
// middleware
app.use(cors());
app.use(cookieparser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.use(golbalerrorhandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    messages: "Not found",
    errorMessages: [
      {
        path: req.originalUrl,
        messages: "Api Not found",
      },
    ],
  });
  next();
});

export default app;
