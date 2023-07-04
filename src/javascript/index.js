/* eslint-disable no-console */

import os from 'os';
import winston from 'winston';
import pino from 'pino';

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: {
    hostname: os.hostname(),
    service: 'logging-service',
    module: 'winston',
  },
  transports: [new winston.transports.Console()],
});

const pinoLogger = pino({
  name: 'pino',
  level: 'info',
  mixin() {
    return {
      service: 'logging-service',
      module: 'pino',
    };
  },
});

// Unstructured logging
console.log('Unstructured logging');

// Winston logging
winstonLogger.log('info', 'Winston logging', {
  logType: 'structured',
  method: 'GET',
  url: 'domain/path',
  userId: 'uuid-v4',
  ipAddress: '127.0.0.1',
});

// Pino logging
pinoLogger.info(
  {
    logType: 'structured',
    method: 'GET',
    url: 'domain/path',
    userId: 'uuid-v4',
    ipAddress: '127.0.0.1',
  },
  'Pino logging',
);
