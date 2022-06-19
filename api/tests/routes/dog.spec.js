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
    it('should get 200', () => {
      agent.get('/dogs').expect(200)
    }
    );
  });
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
    
  })
});
