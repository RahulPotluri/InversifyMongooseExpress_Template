import config from '../config';
import { connect, set, Mongoose } from 'mongoose';
import { logger } from '../utils/logger';

interface dbConfig {
  username?: string,
  password?: string,
  host: string;
  port: number;
  database: string;
}

/**
 * All the methods and properties mentioned in the following class is
 * specific to MongoDB. You should make necessary changes to support
 * the database you want to use.
 */
class DatabaseMongo {
  private password: string;
  private user: string;
  private host: string;
  private dbName: string;
  private port: number;
  private dbClient: Promise<Mongoose>;

  constructor() {
    const { username, host, port, database }: dbConfig = config.dbConfig;
    this.password = process.env.DB_PWD || '';
    this.user = username || '';
    this.host = host || 'localhost:';
    this.port = port || 27017;
    this.dbName = database || 'my-db';
  }

  public async connect(): Promise<void> {

    if (this.dbClient) {
      logger.debug('Connection already exists');
      return;
    }

    const connectionString = this.getConnectionString();
    logger.debug(`Database connection string: ${connectionString}`);

    if (config.env !== 'production') {
      set('debug', true);
    }
  
    this.dbClient = connect(connectionString.url, connectionString.options);
    logger.info('Connected with database host');
  }

  public async disconnect() {
    
    if ( (await this.dbClient).connection.readyState == 1) {
      logger.info(`Disconnected from ${this.host}/${this.dbName}`);
      await (await this.dbClient).disconnect();
    }
  }

  /**
   * Build database connection string.
   * Customize as needed for your database.
   */
  private getConnectionString() {
    const env = process.env.NODE_ENV;
    if (env === 'test' && !process.env.DB_NAME) {
      this.dbName += '_test';
    }

    let url: string;
    if (env !== 'localhost' && this.user && this.password) {
      url = `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.dbName}`;
    } else {
      url = `mongodb://${this.host}:${this.port}/${this.dbName}`;
    }

    const TWO_MINUTES_IN_MS = 2 * 60 * 1000;
    const dbConnection = {
      url: url,
      options: {
        connectTimeoutMS: TWO_MINUTES_IN_MS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    };

    return dbConnection;
  }

  public getDbHost() {
    return this.host;
  }

  public getDbPassword() {
    return this.password;
  }

  public getDbUser() {
    return this.user;
  }

  public getDbName() {
    return this.dbName;
  }
}

const db = new DatabaseMongo();

export default db;


