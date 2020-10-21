const express = require('express');
const Plants = require('./plant-model.js');
const router = express.Router();

router.post('/',  (req, res) => {
    Plants.insert(req.body)
      .then( user => {
        res.status(201).json(user);
      })
      .catch( (err) => {
        res.status(500).json({
          message: 'There was an error adding the user',
          err
        })
      })
  });

router.get('/', (req, res) => {
    Plants.get(req.query)
    .then((plants) => {
        res.status(200).json(plants)
    })
    .catch((err) => {
        res.status(500).json({ error: 'The plants could not be retrieved.', err})
    })
});

router.get('/:id', (req, res) => {
    Plants.getById(req.params.id)
    .then((plant) => {
        plant
        ? res.status(200).json(plant)
        : res.status(404).json({
            message: 'Plant with that ID do not exist.'
        })
    })
    .catch((err) => {
        res.status(500).json({ message: "There was an error retreiving the plant.", error: err})
    })
});

router.delete('/:id',  (req, res) => {
    Plants.remove(parseInt(req.params.id))
      .then((post) => {
        post
          ? res.status(200).json({ post, message: "The plant was deleted." })
          : res.status(404).json({ message: "The plant does not exist." })
      })
      .catch((err) => {
        res.status(500).json({ message: "There was an error deleting the plant.", error: err })
      })
  });

  router.put('/:id', (req, res) => {
    Plants.update(req.params.id, req.body)
      .then((user) => {
        user
          ? res.status(200).json({
              user,
              message: "The user was updated"
            })
          : res.status(404).json({
            message: "That user does not exist"
          })
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error with the server",
          err
        })
      })
  });

  module.exports = router;