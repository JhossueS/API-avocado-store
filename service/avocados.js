const db = require("../lib/mongo");
const client = db();
const collection = 'avocados';

const getAvocados = async () => {
  try {
    const avocados = (await client).getAll(collection);
    return avocados;
  } catch (e) {
    return e;
  }
};

const getAvocado = async (avocadoId) => {
  try {
    const avocado = (await client).get(collection, avocadoId);
    return avocado;
  } catch (e) {
    return e;
  }
};

module.exports = { getAvocados, getAvocado };
