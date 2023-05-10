const { rootController, getPokemonsController, getPokemonByIdController, addPokemonController, updatePokemonController, deletePokemonController } = require('./controllers');
const { dbMiddleware } = require('./dbMiddleware');

const cors = require('cors');
const app = require('express')();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(dbMiddleware);

app
  .get("/",                rootController)
  .get("/pokemons",        getPokemonsController)
  .get("/pokemons/:id",    getPokemonByIdController)
  .post("/pokemons",       addPokemonController)
  .put("/pokemons/:id",    updatePokemonController)
  .delete("/pokemons/:id", deletePokemonController)
  .listen(4000);

