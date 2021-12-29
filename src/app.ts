import express from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes'

const port = config.get<string>("port");

const app = express();
app.use(express.json())

app.listen(port, async () => {
    logger.info(`server running at port: ${port}`)
    await connect();
    routes(app);
})