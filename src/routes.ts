import { Express } from "express";
import { createUserHandler } from "./controllers/user.controller";

export default function(app: Express) {
    app.post('/api/users', createUserHandler)
}