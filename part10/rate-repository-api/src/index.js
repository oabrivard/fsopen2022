import http from 'http';

import logger from './utils/logger';
import { API_PORT, APOLLO_PORT } from './config';
import createApolloServer from './apolloServer';
import app from './app';

const startServer = async () => {
  const httpServer = http.createServer(app);

  const apolloServer = createApolloServer();

  await apolloServer.listen({ port: APOLLO_PORT });

  httpServer.on('request', app.callback());

  await new Promise((resolve) =>
    httpServer.listen({ port: API_PORT }, resolve),
  );

  logger.info(`Apollo Server ready at http://localhost:${APOLLO_PORT}`);
};

startServer();
