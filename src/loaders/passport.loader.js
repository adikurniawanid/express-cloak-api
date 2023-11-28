const passport = require("passport");

const { jwtStrategy } = require("../apis/plugins/passportJWT.plugin");

module.exports = (app) => {
    // jwt authentication
    app.use(passport.initialize());
    passport.use("jwt", jwtStrategy);
};
