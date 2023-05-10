exports.dbMiddleware = (req, res, next) => {
  res.locals.db = dbService(require("./src/pokedex.json"));
  next()
}

const dbService = (_json) =>  {

  const json = _json;

  return {
    select(_id = null) {
      return _id ? json.find(({ id }) => id == _id) : json;
    },

    create(_data) {
      const maxID = json.reduce((acc, { id }) => { if (acc < id) return id }, 0);

      console.log(maxID)

      if (!("id" in _data))
        _data.id = maxID + 1;

      json.push(_data);

      return _data;
    },

    update(_id, _data) {
      if ("id" in _data)
        delete _data["id"];

      const dataIndex = json.findIndex(({ id }) => id == _id);
      json[dataIndex] = {
        id: json[dataIndex].id,
        name: {
          ...json[dataIndex].name,
          ..._data.name
        },
        type: [
          ...json[dataIndex].type,
          ..._data.type
        ],
        base: {
          ...json[dataIndex].base,
          ..._data.base
        }
      };

      return json[dataIndex];
    },

    delete(_id) {
      const dataIndex = json.findIndex(({ id }) => id == _id);
      json.splice(dataIndex, 1);
    }
  }
}