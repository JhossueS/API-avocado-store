const chalk = require('chalk');
const debug = require('debug')('app:scripts:avocados');

const db = require('../lib/mongo');
const avocadosMock = require('../utils/mocks/avocados');

const seedAvcoados = async () => {
  try {
    const client = db();
    const promises = avocadosMock.map(async (avocado) => {
      return (await client).create('avocados', avocado);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} avocados have been created succesfully`));

    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedAvcoados()