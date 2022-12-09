import { injectable } from "inversify";
import { DataSource, getManager } from "typeorm";

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

  constructor({ database, password, port, slug , userName, host }: IConnectioProps) {
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
      name: slug
    });
    this.connection = databaseConneciton;
  }

  async setup(): Promise<void> {
    await this.connection.synchronize();
  }

  async conect(): Promise<void> {
    await this.connection.initialize();
  }

   get isconected(){
    return  this.connection.isInitialized 
  }
}
