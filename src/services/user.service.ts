import { DocumentDefinition } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export async function create(input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | "comparePassword">>) {
    try {
        let user = await UserModel.create(input)
        return user;
    } catch(e: any) {
        throw new Error(e)
    }
}