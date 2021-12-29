import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true}
}, {
    timestamps: true
});

userSchema.pre("save", async function(next) {
    let user = this as UserDocument;
    if(!user.isModified("password")) {
        next()
    }

    let salt = await bcrypt.genSalt(config.get<number>("saltWorkFactory"));
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
});

userSchema.methods.comparePasswords = async (candidatePassword: string): Promise<Boolean> => {
    const user = this as unknown as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch(_ => false);
}
  
const UserModel = mongoose.model("User",userSchema)

export default UserModel;