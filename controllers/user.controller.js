const bcrypt = require("bcryptjs");
const { User } = require("../models/UserModel");
const {generateToken}= require("../utils/jwt")
const Joi = require("joi");

const userJoiSchema = {
    login: Joi.object().keys({
        password: Joi.string(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(()=>Error('Email is not valid'))
    }),
    register: Joi.object().keys({
        password: Joi.string().max(20).required(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(()=>Error('Email is not valid')).required(),
        name: Joi.string().required(),
        date_created: Joi.date(),

    })
}
exports.register = async (req, res, next) => {
    const body= req.body;
    try{
        const valid= userJoiSchema.register.validate(body);
        if(valid.error){
            throw Error(valid.error);
        }

        if( await checkIfUserExists(body.email)){
            throw new Error("Email Already exist in the system");
        }
        const pass= await bcrypt.hash(body.password,10);
        body.password=pass;

        const newUser= new User(body);
        await newUser.save();
        newUser.password="*******";

        return res.status(201).send(newUser);
    } catch (error) {
        next(error);
    }
};

const checkIfUserExists = async (email) => {
    const user = await User.findOne({ email });
    if (user) return user;
    return false;
}

exports.login = async (req, res, next) => {
    const body = req.body;
    try {
        const valid= userJoiSchema.login.validate(body);
        if(valid.error){
            throw Error(valid.error);
        }

        const user = await checkIfUserExists(body.email);
        if(!user|| !await bcrypt.compare(body.password, user.password)){
            throw new Error("password or email not valid");
        }

        //* generete jwt token
        const token= generateToken(user);
        user.password="*******";
        res.status(200).json({user: user, token: token});
    } catch (error) {
        next(error);
    }
};






