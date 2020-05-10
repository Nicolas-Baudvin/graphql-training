import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../Models/user.mjs';

export default async (parentValue, args) => {
    console.log(args);
    const { username, password } = args;

    const user = await User.findOne({ "username": username });

    if (!user) return { "errors": "No user found" };

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { "errors": "Identifiants invalides" }

    delete user.password
    const token = jwt.sign({ "_id": user._id, "username": user.username }, process.env.JWT_KEY, {expiresIn: "24h"});

    return {
        username: user.username,
        firstname: user.firstname,
        userID: user._id,
        token
    };
};