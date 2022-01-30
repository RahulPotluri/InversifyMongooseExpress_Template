import 'dotenv/config';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import App from './app';
import Bindings from './bindings';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App();
const bindings = new Bindings();

let server = new InversifyExpressServer(bindings.getBindings(),null, null, app.getServer());

server.build();

app.listen();
