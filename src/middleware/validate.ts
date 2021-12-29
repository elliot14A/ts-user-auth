import { NextFunction, Response, Request } from 'express'
import {AnyZodObject} from 'zod'

export default (schema: AnyZodObject) => (res: Response, req: Request, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next()
    } catch(err: any) {
        return res.status(400).send(err.errors);
    }
}