const express = require("express");
const next = require("next");
const config = require("../config");
const db = require("./db");
const logger = require("morgan");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

// import controller
const userController = require("./controllers/users");
const userRoutes = require("./routes/user");

app
  .prepare()
  .then(() => {
    const server = express();

    // Apply middleware
    server.use(cors());
    server.use(logger("dev"));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    // server.use("/api/v1/users", userController);

    server.get("/static/*", (req, res) => {
      handle(req, res);
    });
    // Create endpoints
    server.use("/api/v1/users", userRoutes);

    server.get("*", async (req, res) => {
      handle(req, res);
    });
    const start = async () => {
      await db();

      server.listen(port, (err) => {
        if (err) throw err;
        console.log(`Server listening on Port: ${port}`);
      });
    };

    start();
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
