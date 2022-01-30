export class CustomErrorHandler {
  error(error: any, request: any, response: any, next: (err: any) => any) {
    console.log('do something...');
    next(error);
  }
}