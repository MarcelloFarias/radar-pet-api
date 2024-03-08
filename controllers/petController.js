const Pet = require("../models/Pet");

exports.create = async (request, response) => {
    try {
        const pet = {
            name: request.body.name,
            address: request.body.address,
            description: request.body.description,
            lastSeen: request.body.lastSeen,
            image: request.body.image,
            status: request.body.status,
            author: request.body.author
        };

        const res = await Pet.create(pet);

        response.status(201).json({res, message: "Pet registrado com sucesso !"});
    }
    catch(error) {
        console.log(error);
    }
}

exports.getAll = async (_, response) => {
    try {
        const pets = await Pet.find();

        response.json(pets);
    }
    catch(error) {
        console.log(error);
    }
}

exports.getById = async (request, response) => {
    try {
        const id = request.params.id;

        const pet = await Pet.findById(id);

        if(!pet) {
            response.status(404).json({message: "Pet não encontrado !"});
            return;
        }

        response.json(pet);
    }
    catch(error) {
        console.log(error);
    }
}

exports.getPaged = async (request, response) => {
    try {
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;

        const petsPaged = await Pet.find().skip(page * limit);

        if(!petsPaged) {
            response.status(404).json({message: "Pets não registrados !"});
            return;
        }

        if(petsPaged.length < 20) {
            const pets = await Pet.find();
            response.json({pets: pets, total: pets.length});
            return;
        }

        response.json({pets: petsPaged, total: petsPaged.length});
    }
    catch(error) {
        console.log(error);
    }
}

exports.delete = async (request, response) => {
    try {
        const id = request.params.id;

        const pet = await Pet.findById(id);

        if(!pet) {
            response.status(404).json({message: "Pet não encontrado !"});
            return;
        }

        const deletedPet = await Pet.findByIdAndDelete(id);

        response.json({deletedPet, message: "Pet excluído com sucesso !"});
    }
    catch(error) {
        console.log(error);
    }
}

exports.update = async (request, response) => {
    try {
        const id = request.params.id;

        const pet = {
            name: request.body.name,
            address: request.body.address,
            description: request.body.description,
            lastSeen: request.body.lastSeen,
            image: request.body.image,
            status: request.body.status,
            author: request.body.author
        };

        const updatedPet = await Pet.findByIdAndUpdate(id, pet);

        if(!updatedPet) {
            response.status(404).json({message: "Pet não encontrado !"});
            return;
        }

        response.status(200).json({updatedPet, message: "Pet atualizado com sucesso !"});
    } 
    catch (error) {
        console.log(error);    
    }
}