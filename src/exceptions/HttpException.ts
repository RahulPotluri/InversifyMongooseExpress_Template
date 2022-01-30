

export class HttpException {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    // super(status, message);
    this.status = status;
    this.message = message;
  }
}
