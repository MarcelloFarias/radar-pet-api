require("dotenv/config");
const {User} = require("../models/User");
const jwt = require("jsonwebtoken");

exports.authenticate = async (request, response) => {
    try {
        const credentials = {
            email: request.body.email,
            password: request.body.password
        };

        const user = await User.findOne({"email": credentials.email});

        if(!user) {
            response.status(404).json({message: "E-mail incorreto !"});
            return;
        }

        user.comparePassword(credentials.password, (error, isMatch) => {
            if(error) {
                console.log(error);
            }

            if(isMatch) {
                const id = this._id;
                const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: 300});

                response.json({token: token});
            }
            else {
                response.status(404).json({message: "Senha incorreta !"});
            }
        });
    }
    catch(error) {
        console.log(error);
    }
}

exports.create = async (request, response) => {
    try {
        const user = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            phone: request.body.phone,
        };

        const res = await User.create(user);

        response.status(201).json({res, message: "Usuário registrado com sucesso !"});
    }
    catch(error) {
        console.log(error);
    }
}

exports.getAll = async (_, response) => {
    try {
        const users = await User.find();

        response.json(users);
    }
    catch(error) {
        console.log(error);
    }
}

exports.getById = async (request, response) => {
    try {
        const id = request.params.id;
        const user = User.findById(id);

        if(!user) {
            response.status(404).json({message: "Usuário não encontrado !"});
            return;
        }
        response.json(user);
    } 
    catch(error) {
        console.log(error);
    }
}

exports.delete = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await User.findById(id);

        if(!user) {
            response.status(404).json({message: "Usuário não encontrado !"});
            return;
        }

        const deletedUser = await User.findByIdAndDelete(id);

        response.status(200).json({deletedUser, message: "Usuário excluído com sucesso !"});
    }
    catch(error) {
        console.log(error);
    }
}

exports.update = async (request, response) => {
    const id = request.params.id;

    const user = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        phone: request.body.phone,
    };

    const updatedUser = await User.findByIdAndUpdate(id, user);

    if(!updatedUser) {
        response.status(404).json({message: "Usuário não encontrado !"});
        return;
    }

    response.status(200).json({updatedUser, message: "Usuário atualizado com sucesso !"});
}