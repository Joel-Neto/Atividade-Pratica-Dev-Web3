var Project = require('../models/projectModel');

exports.getProject = async function (req, res) {
    try {
        const result = await Project.find().populate('assignedTo');
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.details = async function (req, res) {
    try {
        const result = await Project.findById(req.params.id);
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.create = function (req, res) {
let project = new Project(
    {
    title: req.body.title,
    description: req.body.description,
    assignedTo: req.body.assignedTo
    }
    );
    project.save()
    .then(res.status(201).send(project.toJSON()))
    .catch((err) => {
        res.status(500).send({message: `${err.message} - falha ao cadastrar projeto.`})
    })
};

exports.update = async function (req, res) {
    try {
        const id = req.params.id;

        const projectExists = Project.findById(id);

        if (!projectExists) {
            res.status(404).send({ message: `Projeto de id = ${id} não foi encontrado!` });
        }
 
        await Project.findByIdAndUpdate({_id: id}, req.body);

        res.status(200).send("Projeto atualizado com sucesso!");
    } catch (error) {
        res.status(500).send({ message: `${error.message} - falha ao cadastrar Projeto.` })
    }
}

exports.delete = async function (req, res) {
    try {
        const id = req.params.id;

        const projectExists = Project.findById(id);

        if (!projectExists) {
            res.status(404).send({ message: `Projeto de id = ${id} não foi encontrado!` });
        }

        await Project.findByIdAndDelete({_id: id});

        res.status(200).send("Projeto excluído com sucesso!");
    } catch (error) {
        res.status(500).send({ message: `${error.message} - falha ao cadastrar Projeto.` });
    }
}