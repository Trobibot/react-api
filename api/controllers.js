exports.rootController = (req, res) => {
  res.status(200).json("Librart API v0.1");
}

exports.getPokemonsController = (req, res) => {
  res.status(200).json(res.locals.db.select());
}

exports.getPokemonByIdController = (req, res) => {
  res.status(200).json(res.locals.db.select(req.params.id));
}

exports.addPokemonController = (req, res) => {
  res.status(200).json(res.locals.db.create(req.body));
}

exports.updatePokemonController = (req, res) => {
  res.status(200).json(res.locals.db.update(req.params.id, req.body));
}

exports.deletePokemonController = (req, res) => {
  res.locals.db.delete(req.params.id)
  res.status(200).end();
}