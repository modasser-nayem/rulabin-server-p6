import express from "express";
import cors from "cors";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";

const app = express();

// using middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Application routes
app.use("/api/v1", routes);

// root route
app.get("/", (_req, res) => {
  res
    .status(200)
    .send(
      '<div style="height:80vh; width:100vw; display:flex; justify-content:center;align-items:center;font-size:4rem;font-style: oblique;font-weight: bold;font-family:system-ui;color:purple;">Rulabin Server is Running...</div>',
    );
});

app.get("/welcome", (_req, res) => {
  res
    .status(200)
    .send(
      '<div style="height:80vh; width:100vw; display:flex; justify-content:center;align-items:center;font-size:4rem;font-style: oblique;font-weight: bold;font-family:system-ui;color:purple;">Welcome to you Rulabin Server</div>',
    );
});

// not exist route
app.use("*", notFoundRoute);

// Application Errors
app.use(globalErrorHandler);

export default app;
