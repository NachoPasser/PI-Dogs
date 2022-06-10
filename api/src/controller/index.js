const { Dog, Temper } = require('../db.js');
const axios = require('axios')
const {MY_API_KEY} = process.env;
const API_KEY = `api_key=${MY_API_KEY}`
const getDogs = async (req, res) => {
    const {name} = req.query
    try {
        let dogs = await axios(`https://api.thedogapi.com/v1/breeds?${API_KEY}`)

        let dbDogs = await Dog.findAll({ //obtengo todos los perros de la base de datos incluyendo su temperamento
            include: {
                model: Temper,
                as: 'temperament',
                required: true,
                through: {attributes : []}
              }
        })

        dbDogs.forEach(d => { //cambio la propiedad temperamento de cada perro para que coincida con el formato de la API
            let dog = d.dataValues
            for(const i in dog.temperament){
                let temp = dog.temperament[i].dataValues.name
                dog.temperament[i] = temp
            }
            dog.temperament = dog.temperament.join(', ')
        })

        dogs = dogs.data.concat(dbDogs)
        
        if(name){
            const dog = dogs.find(d => d.name === name)
            !dog ? res.status(404).send('Perro no encontrado!') : res.status(200).send(dog)
        } else{
            let a = dogs.get
            res.status(200).send(dogs)
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
}

const getDogById = async (req, res) => {
    const id = req.params.idRaza
    if(isNaN(Number(id))){ //pregunto esto para verificar si la id es una uuid o una id invalida.
        try {
            let dbDog = await Dog.findByPk(id)
            if(dbDog) return res.json(dbDog)
            else return res.status(404).send('Perro no encontrado!')
        } catch (error) {
            return res.status(400).send('La id introducida no es valida!')
        }
    }
    let dogs = await axios(`https://api.thedogapi.com/v1/breeds?${API_KEY}`)
    const dog = dogs.data.find(d => d.id === parseInt(id))
    if(!dog) return res.status(404).send('Perro no encontrado!')
    return res.json(dog)
}

const addDog = async (req, res) => {
    const {name, height, weight, life_span, temperament} = req.body //temperament es un array de strings
    if(!name || !height || !weight || !life_span) return res.status(400).send('Falta enviar datos obligatorios')
    try{
        const newDog = await Dog.create(req.body)
        for(const temper of temperament){ //obtengo los temperamentos de la tabla Temper y se los añado al perro
            const temperamentFound = await Temper.findAll({
                where: {
                    name: temper
                }
            })
            newDog.addTemperament(temperamentFound)
        }
        res.status(201).json(newDog)
    } catch(e){
        res.status(400).send(error)
    }

}

const setTemperament = async () => { //Agrego a la tabla Temper todos los temperamentos de la API
    let dogs = await axios(`https://api.thedogapi.com/v1/breeds?${API_KEY}`)
    dogs.data.forEach(d => {
        if(d.temperament){
            let temperamentos = d.temperament.split(', ')
            temperamentos.map(async t => {
                await Temper.findOrCreate({
                    where: {
                        name: t
                    }
                })
            })
            
        }
    })
}

const getTemperament = async (req, res) => {
    const tempers = await Temper.findAll()
    res.json(tempers)
}

setTemperament()

module.exports = {
    getDogs,
    getDogById,
    addDog,
    getTemperament
}