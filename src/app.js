const Logger = require("./libs/logger.lib");
const bannerLogger = require("./libs/banner.lib");
const expressLoader = require("./loaders/express.loader");
const mongooseLoader = require("./loaders/mongoose.loader");
const monitorLoader = require("./loaders/monitor.loader");
const passportLoader = require("./loaders/passport.loader");
const publicLoader = require("./loaders/public.loader");
const swaggerLoader = require("./loaders/swagger.loader");
const winstonLoader = require("./loaders/winston.loader");

const log = new Logger(__filename);

async function initApp() {
    winstonLoader();
    await mongooseLoader();
    const app = expressLoader();
    monitorLoader(app);
    swaggerLoader(app);
    passportLoader(app);
    publicLoader(app);
}

initApp()
    .then(() => bannerLogger(log))
    .catch((error) => log.error("Application is crashed: " + error));
