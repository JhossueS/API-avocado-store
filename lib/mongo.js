const { MongoClient } = require("mongodb");
const moongose = require('mongoose');
const { config } = require("../config");

const USER = encodeURIComponent(config.dbUser);
const PASSOWRD = config.dbPassword;
const DB_NAME = config.dbName;
const DB_HOST = config.dbHost;

const MONGO_URI = `mongodb+srv://${USER}:${PASSOWRD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(MONGO_URI);

const main = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = new moongose.mongo.Db(client, DB_NAME);

  // get all data on collection
  const getAll = async (collection) => {
    return await db.collection(collection).find({}).toArray();
  }

  // get only data on collection
  const get = async (collection, query) => {
    return await db.collection(collection).findOne({ $or: [{ id: query }, { email: query }] });
  }

  // creatate item on collection
  const create = async (collection, data) => {
    return await db.collection(collection).insertOne(data)
  }

  //cdele item on collection
  const deleteData = async (collection, id) => {
    return db.collection(collection).deleteOne({ id })
  }

  return {
    getAll,
    get,
    create,
    deleteData,
  };
}

module.exports = main;
