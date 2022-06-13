const { Dog, Temper } = require('../db.js');
const axios = require('axios');
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

        dbDogs = dbDogs.map(d => { //formateo a los perros de la base de datos para que coincidan con los datos pedidos
            let dog = d.dataValues
            return {
                'id': dog.id,
                'name': dog.name,
                'temperament': (dog.temperament.map(t => t.dataValues.name)).join(', '), //formateo sus temperamentos para que coincidan con el formato de la API.
                'weight': dog.weight
            }
        })

        dogs = dogs.data.map(d => { //formateo a los perros de la API para que coincidan con los datos pedidos.
            return {
                'id': d.id,
                'image': d.image.url,
                'name': d.name,
                'temperament': d.temperament,
                'weight': d.weight.metric
            }
        })

        dogs = dogs.concat(dbDogs)

        if(name){
            const dog = dogs.find(d => d.name === name)
            !dog ? res.status(404).send('Perro no encontrado!') : res.status(200).send(dog)
        } else{
            res.status(200).send(dogs)
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
}

const getDogById = async (req, res) => {
    const id = req.params.idRaza
    if(isNaN(Number(id))){ //verifico si la id es una uuid o una id invalida.
        try {
            let dbDog = await Dog.findByPk(id, {
                include: {
                    model: Temper,
                    as: 'temperament',
                    required: true,
                    through: {attributes : []}
                  }
            })
            
            if(dbDog) return res.json({
                'name': dbDog.dataValues.name,
                'temperament': (dbDog.dataValues.temperament.map(t => t.dataValues.name)).join(', '),
                'height': dbDog.dataValues.height,
                'weight': dbDog.dataValues.weight,
                'life_span': dbDog.dataValues.life_span
            })
            else return res.status(404).send('Perro no encontrado!')
        } catch (error) {
            return res.status(400).send('La id introducida no es valida!')
        }
    }

    let dogs = await axios(`https://api.thedogapi.com/v1/breeds?${API_KEY}`)
    const dog = dogs.data.find(d => d.id === parseInt(id))
    if(!dog) return res.status(404).send('Perro no encontrado!')

    return res.json({
        'image': dog.image.url,
        'name': dog.name,
        'temperament': dog.temperament,
        'height' :dog.height.metric,
        'weight':dog.weight.metric,
        'life_span': dog.life_span
    })
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
        res.status(400).send(e)
    }

}

const createTemperaments = async () => { //Agrego a la tabla Temper todos los temperamentos de la API
    let dogs = await axios(`https://api.thedogapi.com/v1/breeds?${API_KEY}`)
    dogs.data.forEach(d => {
        if(d.temperament){
            let temperamentos = d.temperament.split(', ')
            temperamentos.map(async temper => {
                await Temper.findOrCreate({
                    where: {
                        name: temper
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

createTemperaments()

module.exports = {
    getDogs,
    getDogById,
    addDog,
    getTemperament
}