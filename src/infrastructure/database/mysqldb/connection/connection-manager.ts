import { injectable } from "inversify";
import { DataSource, getManager } from "typeorm";

const CREATE_DATABASE_QUERY = 'CREATE DATABASE IF NOT EXISTS ::DATABASE_NAME::;'
interface IConnectioProps {
  host: string;
  database: string;
  password: string;
  port: number;
  userName: string;
  slug: string;
}

@injectable()
export class ConnectionManager {
  connection!: DataSource;

  constructor({ database, password, port, slug, userName, host }: IConnectioProps) {
    const databaseConneciton = new DataSource({
      type: "mysql",
      host,
      port: Number(port),
      username: userName,
      password: password,
      database: database,
      logging: false,
      entities: [],
      subscribers: [],
      migrations: [],
      name: slug,
    });
    this.connection = databaseConneciton;
  }

  async setup(): Promise<void> {
    await this.connection.synchronize();
  }

  async createDatabaseIfNotExists(syncronize = false): Promise<void> {
    const conn = { ... this.connection.options }
    delete conn.database
    const query = CREATE_DATABASE_QUERY.replace('::DATABASE_NAME::', this.connection.options.database as string)
    const dataSource = new DataSource(conn)

    await dataSource.initialize()
    await dataSource.query(query)
    await dataSource.synchronize()
    await dataSource.destroy()
  }

  async conect(): Promise<void> {
    await this.connection.initialize();
  }

  get isconected() {
    return this.connection.isInitialized
  }
}
