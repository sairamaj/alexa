import * as https from 'https'
import * as http from 'http'
import * as debug from 'debug';
import * as fs from 'fs';
import App from './App';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const port = normalizePort(443);
App.set('port', port);

const port1 = normalizePort(3001);
App.set('port1', port1);

var sslOptions = {
    key: fs.readFileSync('alexahost.key'),
    cert: fs.readFileSync('alexahost.crt'),
    passphrase: '1234'
};
const httpsServer = https.createServer(sslOptions, App)
const httpServer = http.createServer(App)
httpServer.listen(port1)
httpsServer.listen(port)
httpsServer.on('error', onError);
httpsServer.on('listening', onHttpsListening);

function normalizePort(val: number | string): number | string | boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
  }

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    console.log('in onError...')
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges (make sure iis stopped on this machine. You can use net stop w3svc command at command prompt before using this app.`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        console.log('in default throwing error.')
        throw error;
    }
  }

  
function onHttpsListening(): void {
    let addr = httpsServer.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`https listening on ${bind}`);
}