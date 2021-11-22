const mapTypeId = require("../../common/utils/map-id");
const validations = require("../utils/validations/auth");
const authService = require("../../common/services/auth");
const schemaValidate = require("../../common/utils/validate-schema");

async function register(req, res) {
    const cleanFields = await schemaValidate(
        validations.registerSchema,
        req.body
    );
    await authService.createUser(cleanFields);

    res.send({message: "Successfully create user"});
}

async function login(req, res) {
    const cleanFields = await schemaValidate(validations.loginSchema, req.body);
    const user = await authService.login(cleanFields);

    const token = user.generateToken();
    const userFields = user.excludePassword();

    res.send({user: {...userFields, token}});
}

module.exports = {register, login};
