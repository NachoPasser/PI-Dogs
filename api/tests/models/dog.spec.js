const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { DataTypes } = require('sequelize');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    
    describe('name', () => {
      it('should throw an error if name is null', () => {
        return Dog.create({height: '2 - 5', weight: '3 - 5'})
              .catch((err) => {
              expect(err.errors[0].message).equal('dog.name cannot be null');
              });
      });
      it('should be unique', () => {
        return Dog.create({ name: 'Pug', height: 'x', weight: 'y'})
              .then(() => Dog.create({ name: 'Pug', height: 'x', weight: 'y'})
                          .catch(e => expect(e.name).equal('SequelizeUniqueConstraintError')))
      })
    });

    describe('height', () => {
      it('should throw an error if height is null', () => {
        return Dog.create({name: 'Pug', weight: '3 - 5'})
              .catch((err) => {
              expect(err.errors[0].message).equal('dog.height cannot be null');
              });
      });
    });

    describe('weight', () => {
      it('should throw an error if weight is null', () => {
        return Dog.create({name: 'Pug', height: '3 - 5'})
              .catch((err) => {
              expect(err.errors[0].message).equal('dog.weight cannot be null');
              });
      });
    })

    describe('life_span', () => {
      it('can be null', () => {
        return Dog.create({name: 'Pug', height: '3 - 5', weight: '10 - 20'})
                  .then((data) => expect(data).not.be.empty)
                  .catch((e) => expect(e.errors[0].message).not.equal('dog.life_span cannot be null'))
      })

      it('should be added when its specified', () => {
        return Dog.create({ name: 'Pug', height: "3 - 5", weight: 5, life_span: '5 - 15'})
                .then((data) => expect(data.dataValues.hasOwnProperty('life_span')).equal(true))
      });
    })

    describe('timestamps', () => {
      it('should not be added in creation', () => {
        return Dog.create({name : 'Pug', height: '3 - 5', weight: '10 - 15'})
              .then(data => {
                data = data.toJSON()
                expect(data.hasOwnProperty('createdAt')).equal(false)
                expect(data.hasOwnProperty('updatedAt')).equal(false)
              })
      })
    })

    it('dog should be created succesfully', () => {
      return Dog.create({name: 'Pug', height: '3 - 5', weight: '10 - 15', life_span: '5 - 15'})
              .then(data => {
                data = data.toJSON()
                delete data['id']
                expect(data).eql({name: 'Pug', 
                height: '3 - 5',
                weight: '10 - 15',
                life_span: '5 - 15'})
              })
    });
  });
});
