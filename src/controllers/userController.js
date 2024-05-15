var User = require('../models/userModel');
const jwt = require("jsonwebtoken");


exports.getUser = async function (req, res) {
    try {
        const result = await User.find();
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.details = async function (req, res) {
    try {
        const result = await User.findById(req.params.id);
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.create = function (req, res) {
    let user = new User(
        {
            name: req.body.name,
            age: req.body.age
        }
    );
    user.save()
        .then(res.status(201).send(user.toJSON()))
        .catch((err) => {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar usuário.` })
        })
};

exports.login = function (req, res) {
    try {
        
        const id = req.body.id;

        const userExists = User.findById(id);

        if (!userExists) {
            res.status(404).send({ message: `Usuário de id = ${id} não foi encontrado!` });
        }

        jwt.sign(
            { usuario: { _id: userExists._id } }, 
            process.env.SECRETE_KEY,
            {expiresIn: process.env.EXPIRES_IN},
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    access_token: token
                })
            }
        );

    } catch (error) {
        res.status(500).send({ message: `${error.message} - falha ao realizar login.` })
    }
};

exports.update = async function (req, res) {
    try {
        const id = req.params.id;

        const userExists = User.findById(id);

        if (!userExists) {
            res.status(404).send({ message: `Usuário de id = ${id} não foi encontrado!` });
        }
 
        const user = await User.findByIdAndUpdate({_id: id}, req.body);

        res.status(200).send("Usuário atualizado com sucesso!");
    } catch (error) {
        res.status(500).send({ message: `${error.message} - falha ao cadastrar usuário.` })
    }
}

exports.delete = async function (req, res) {
    try {
        const id = req.params.id;

        const userExists = User.findById(id);

        if (!userExists) {
            res.status(404).send({ message: `Usuário de id = ${id} não foi encontrado!` });
        }

        await User.findByIdAndDelete({_id: id});

        res.status(200).send("Usuário excluído com sucesso!");
    } catch (error) {
        res.status(500).send({ message: `${error.message} - falha ao deletar usuário.` });
    }
}