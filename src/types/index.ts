export type Config = {
  app: string | undefined;
  port: string | undefined;
  env: string | undefined;
  commitHash: string | undefined;
  mongoUri: string | undefined;
  jwtSecKey: string;
  jwtExpiry: string
};
