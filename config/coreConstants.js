class CoreConstants {
  get ENVIRONMENT() {
    return process.env.ENVIRONMENT;
  }
}

module.exports = new CoreConstants();
