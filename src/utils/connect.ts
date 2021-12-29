import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

async function connect() {
    const dbUri = config.get<string>("dbUri");

    try {
        await mongoose.connect(dbUri);
        logger.info("mongodb connected!");
    } catch(err) {
        logger.error(err);
    }
}

export default connect;