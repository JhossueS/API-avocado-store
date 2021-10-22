const db = require("../lib/mongo");

const getAvocados = async (collection) => {
  try {
    const client = db();
    const avocados = (await client).getAll(collection);
    return avocados;
  } catch (e) {
    return e;
  }
};

const getAvocado = async (collection, avocadoId) => {
  try {
    const client = db();
    const avocado = (await client).get(collection, avocadoId);
    return avocado;
  } catch (e) {
    return e;
  }
};

module.exports = { getAvocados, getAvocado };
