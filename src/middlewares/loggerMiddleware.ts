
export class LoggerMiddleware {
  // interface implementation is optional

  use(request: any, response: any, next?: (err?: any) => any): any {
    console.log('do something...');
    next();
  }
}