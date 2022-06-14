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
                'weight': d.weight.metric.includes('NaN') ? 'Peso no especificado' : d.weight.metric
            }
        })

        dogs = dogs.concat(dbDogs)

        if(name){
            const dog = await dogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
            dog.length ? res.status(200).send(dog) : res.status(404).send('No se encontró ningun perro :(')
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
                'name': dbDog.name,
                'temperament': (dbDog.temperament.map(t => t.dataValues.name)).join(', ') ,
                'height': dbDog.height,
                'weight': dbDog.weight,
                'life_span': dbDog.life_span
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
        const newDog = await Dog.create({name, height, weight, life_span})
            const temperamentFound = await Temper.findAll({ //obtengo los temperamentos de la tabla Temper y se los añado al perro
                where: {
                    name: temperament
                }
            })
            newDog.addTemperament(temperamentFound)
        res.status(201).json(newDog)
    } catch(e){
       console.log(e)
    }

}

const getTemperament = async (req, res) => { //Agrego a la tabla Temper todos los temperamentos de la API
    let dogs = await axios(`https://api.thedogapi.com/v1/breeds?${API_KEY}`)
    dogs.data.forEach(d => {
        if(d.temperament){
            let temperamentos = d.temperament.split(', ')
            temperamentos.map(async temper => {
                Temper.findOrCreate({
                    where: {
                        name: temper
                    }
                })
            })
            
        }
    })
    const tempers = await Temper.findAll()
    res.json(tempers)
}

// puedo invocagetTemperament() esto lo hago solo si force:true, ya que lo requiero para crear perros, caso contrario no es necesario

module.exports = {
    getDogs,
    getDogById,
    addDog,
    getTemperament
}