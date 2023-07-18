export interface IDatabaseConfigAttributes {
  type?: string;
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  entities?: string[];
  synchronize?: boolean;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}
