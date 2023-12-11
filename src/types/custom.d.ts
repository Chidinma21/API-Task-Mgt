declare namespace Express {
  export interface Request {
    store: any;
  }
  export interface Response {
    respond: (
      status: number,
      message: string,
      success?: boolean,
      data?: any
    ) => void;
  }
}