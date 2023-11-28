const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const xss = require("xss-clean");
const env = require("../configs/env.config");
const {
    errorConverter,
    errorHandler,
} = require("../middlewares/error.middleware");
const { customizeLimiter } = require("../middlewares/rateLimit.middleware");
const routeConfig = require("../apis/routes");

module.exports = () => {
    const app = express();

    app.use(morgan("dev"));
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(xss());
    app.use(mongoSanitize());
    app.use(compression());
    app.use(cors());
    app.options("*", cors());

    if (env.isProduction) {
        app.use("/v1/auth", customizeLimiter);
    }

    app.use(env.app.routePrefix, routeConfig);
    app.use(errorConverter);
    app.use(errorHandler);

    app.listen(env.app.port);

    return app;
};
