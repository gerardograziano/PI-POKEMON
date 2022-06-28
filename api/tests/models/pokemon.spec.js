const { Pokemons, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemons.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemons.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });



      it('should create the Pokemon if all required properties are ok', async () => {
            const pokemon = await Pokemons.create({
              name: 'Charmander',
              hp: 100,
              attack:200,
              defense: 150,
              speed:150,
              height: 78, 
              weight: 100,
            });
            expect(pokemon.toJSON()).to.have.own.property('name');
            expect(pokemon.toJSON().name).to.equal('Charmander');
        });

      
    
      it('should not create two Pokemon with the same name', async () => {
        const pokemonOne = await Pokemons.create({name: 'Charizard', hp: 100, attack: 150})
        expect(pokemonOne.toJSON()).to.have.own.property('name');
        expect(pokemonOne.toJSON().name).to.equal('Charizard');
        let errorDuplicados = null;
        const pokemonTwo = await Pokemons.create({name: 'Charizard', hp: 10, attack: 150});
                // .then(() => done(new Error('Pokemon already existing')))
                // .catch((error) => {
                //     console.log(error.name);
                //     expect(error.name).to.equal('SequelizeUniqueConstraintError');
                //     done()});
        console.log(pokemonTwo.Error.message);
                    
      });

    
    });
  });

});
