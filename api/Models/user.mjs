import CWM from 'graphql-compose-mongoose';
const { composeWithMongoose } = CWM;
import timestamps from 'mongoose-timestamp';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: { type: String, trim: true, required: true },
    firstname: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
});

UserSchema.plugin(timestamps);

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);

        bcrypt.hash(user.password, salt)
            .then((hash) => {
                user.password = hash;
                next();
            })
            .catch((err) => next(err));

    });
})

UserSchema.index({ createdAt: 1, updatedAt: 1 });

const User = mongoose.model('User', UserSchema);


const customizationOption = {};
const UserTC = composeWithMongoose(User, customizationOption);

export { User, UserTC };
