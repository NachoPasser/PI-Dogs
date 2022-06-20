/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn, Temper } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id: "11111111-1111-1111-1111-111111111111",
  name: 'Pug',
  height: '3 - 5',
  weight: '10 - 15',
  life_span: '5 - 15 years'
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => {
      Dog.create(dog)
      .then(newDog => {
        Temper.findOne({where: {name: 'Happy'}})
        .then(temper =>  newDog.addTemperament(temper))
      })
    }));
  describe('GET /dogs', () => {
    it('should', async () => {
      let dog = await agent.get('/dogs?name=affenpinscher')
      // console.log(dog.body)
    })
  })
  describe('GET /dogs/:id', () => {
    it('should get 200', () => 
    agent.get('/dogs/11111111-1111-1111-1111-111111111111').expect(200)
    );

    it('should return expected dog', async () => {
      let dbDog = await agent.get('/dogs/11111111-1111-1111-1111-111111111111')
      expect(dbDog.body).eql({
        name: 'Pug',
        height: '3 - 5',
        weight: '10 - 15',
        life_span: '5 - 15 years',
        temperament : "Happy",
        life_span: '5 - 15 years'
      })
    })

    it('should get 400 if id is invalid', async () => {
      let dog = await agent.get('/dogs/NaN')
      expect(dog.error.text).equal('La id introducida no es valida!')
      expect(dog.error.status).equal(400)
    })

    it('should get 404 if dog from database not found', async () => {
      let dog = await agent.get('/dogs/22222222-2222-2222-2222-222222222222')
      expect(dog.error.text).equal('Perro no encontrado!')
      expect(dog.error.status).equal(404)
    })

    it('should get 404 if dog from API not found', async () => {
      let dog = await agent.get('/dogs/404')
      expect(dog.error.text).equal('Perro no encontrado!')
      expect(dog.error.status).equal(404)
    })
  })
});
