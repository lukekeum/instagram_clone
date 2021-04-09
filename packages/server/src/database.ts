import { ConnectionOptions, createConnection } from 'typeorm';
import entities from './entities';
import 'pg';

class Database {
  private _connectOptions: ConnectionOptions;

  constructor() {
    this._setupConnectOptions();
  }

  private _setupConnectOptions() {
    this._connectOptions = {
      entities,
      type: process.env.TYPEORM_TYPE as any,
      host: process.env.TYPEORM_HOST,
      database: process.env.TYPEORM_DATABASE,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      port: Number(process.env.TYPEORM_PORT || '3306'),
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      logging: process.env.TYPEORM_LOGGING === 'true',
    };
  }

  public async connect() {
    return createConnection(this._connectOptions);
  }
}

export default Database;
