import {Request, Response} from 'express';
import { omit } from 'lodash';
import { CreateUserSchema } from '../schemas/user.schema';
import { create } from '../services/user.service';
import logger from '../utils/logger';

export async function createUserHandler(req: Request<{}, {}, CreateUserSchema["body"]>, res: Response) {
    try { 
        let user = await create(req.body);
        return res.send(omit(user.toJSON(), "password")) 
    } catch(e: any) { 
        logger.error(e);
        return res.status(409).send(e.msesage);
    }
}