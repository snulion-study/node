const express = require("express");
const router = express.Router();
const path = require("path");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "Swagger API Docs",
      version: "1.0.0",
      description: "prod by Hyemin",
    },
    host: "localhost:3000",
    basePath: "/",
  },
  apis: [path.join(__dirname, "../controllers/*.js")],
};

const specs = swaggerJsdoc(options);

router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
