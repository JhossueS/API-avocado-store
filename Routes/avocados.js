const express = require('express');
const { getAvocados, getAvocado } = require('../service/avocados');

const productsApi = (app) => {
  const router = express.Router();
  app.use('/api/avocados', router);

  // get all avocados
  router.get('/', async (req, res, next) => {
    try {
      const avocados = await getAvocados('avocados');

      res.status(200).json({
        data: avocados,
        message: 'avocado retrieved',
      });
    } catch (err) {
      next(err);
    }
  });

  // get avocado for id
  router.get('/:avocadoId', async (req, res, next) => {
    const { avocadoId } = req.params;
    try {
      const avocado = await getAvocado('avocados', avocadoId);

      res.status(200).json({
        data: avocado,
        message: 'avocado retrieved',
      });
    } catch (err) {
      next(err);
    }
  });
};

module.exports = productsApi;
