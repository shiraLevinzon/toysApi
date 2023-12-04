const { decodeToken } = require("../utils/jwt");

exports.auth = (role) => {
    return async function (req, res, next) {
        let token = req.headers["x-api-key"];
        console.log(token);
        if (!token) return res.json({ msg: "header not contain token" })
        //token= token.split(" ")[1];
        try {
            const payload = decodeToken(token);
            //save the token user id in locals
            res.locals.userId = payload._doc.id;
            console.log(payload._doc.id);
            next();
        }
        catch(error){
            next(error);
        }
    }
}
