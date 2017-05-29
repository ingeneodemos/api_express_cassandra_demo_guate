var winston = require('winston');
var moment = require('moment');
winston.emitErrs = true;

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: config.logLevel,
      filename: config.logPath,
      handleExceptions: true,
      json: false,
      maxsize: config.logFileSize*1024*1024, //MB
      maxFiles: config.logMaxFiles,
      colorize: false,
      timestamp: function() {
        return new moment().format("YYYY-MM-DD HH:mm:ss.SSS");
      }
    }),

    new winston.transports.Console({
      level: config.logLevel,
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: function() {
        return new moment().format("YYYY-MM-DD HH:mm:ss.SSS");
      }
    })
  ],
  exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: function(message) {
    logger.log(config.logLevel, message);
  }
};