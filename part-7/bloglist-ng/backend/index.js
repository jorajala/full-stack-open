const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

app.listen(config.PORT, config.HOSTNAME, () => {
  logger.info(`Server running on http://${config.HOSTNAME}:${config.PORT}`);
});
