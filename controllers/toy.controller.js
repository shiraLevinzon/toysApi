const { Toy } = require("../models/ToyModel");
const Joi = require("joi");

const perPage = 10;

const toyJoiSchema = {
    toyObj: Joi.object().keys({
        name: Joi.string().required(),
        info: Joi.string(),
        category: Joi.string(),
        price: Joi.number(),
        img_url: Joi.string(),
        date_created: Joi.date()
    })
}


exports.getAllTasks = async (req, res, next) => {
    try {
        const { page } = req.query;

        const toys = await Toy.find()
            .populate('ownerId')
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.send(toys);

    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

}

exports.getTaskByName = async (req, res, next) => {
    try {
        const { s, page } = req.query;
        const toys = await Toy.find({ name: s } || { info: s })
            .populate('ownerId')
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.send(toys);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

}
exports.getTaskByCat = async (req, res, next) => {
    try {
        const { catname } = req.params;
        const { page } = req.query;
        const toys = await Toy.find({ category: catname })
            .populate('ownerId')
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.send(toys);

    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

}
exports.getTasksBetween = async (req, res, next) => {
    try {
        const { min, max, page } = req.query;
        const toys = await Toy.find({ price: { $gte: min, $lte: max } })
            .populate('ownerId')
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.send(toys);

    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

}
exports.getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const toys = await Toy.find({ _id: id });
        res.send(toys);

    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

}
exports.addTask = async (req, res, next) => {
    const body = req.body;
    const userId = res.locals.userId;
    try {
        const valid = toyJoiSchema.toyObj.validate(body);
        if (valid.error) {
            throw Error(valid.error);
        }

        const newToy = new Toy(body);
        // add extra things
        //newToy.id = newToy._id;

        //save the parent referncing to the current loded in user 
        newToy.ownerId = userId;
        await newToy.save();
        res.status(201).send(newToy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
exports.deleteTask = async (req, res, next) => {
    try {
        //console.log(req.params.id);
        const toy= await Toy.findOne({_id:req.params.id});
        if (res.locals.userId != toy.ownerId)
            return res.status(404).json({ msg: "the login user cant delete this toy" });

        const delItem = await Toy.findByIdAndDelete(req.params.id);
        if (!delItem) return res.sendStatus(404);
        res.status(200).send(delItem);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
};
exports.updateTask = async (req, res, next) => {
    const body = req.body;
    try {
        const valid = toyJoiSchema.toyObj.validate(body);
        if (valid.error) throw Error(valid.error);
        console.log(res.locals.userId);
        console.log(req.params.id);
        const toy= await Toy.findOne({_id:req.params.id});
        console.log(toy.ownerId);
        if (res.locals.userId != toy.ownerId)
            return res.status(404).json({ msg: "thr login user cant update this toy" });

        const updatedObject = await Toy.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedObject) return res.sendStatus(404);

        res.status(200).send(updatedObject);
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
};
