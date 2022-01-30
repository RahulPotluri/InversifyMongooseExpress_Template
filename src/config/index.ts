let config_path;

if (process.env['NODE_DEV'] == "development") {
    config_path = require('./config_dev');
} else {
    config_path = require('./config_prod');
}

const config = {
    env: config_path.env,
    secretKey: config_path.secretKey,
    dbConfig: config_path.dbConfig,
    log: config_path.log,
    cors: config_path.cors
}

export default config;