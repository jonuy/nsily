'use strict';

const db = require('./db');
const express = require('express');
const router = express.Router();
const Ily = require('./ily');

/**
 * POST /ily
 * Saves an ily
 */
router.post('/ily', (req, res) => {
  const ily = new Ily({ note: req.body.note.trim() });
  ily
    .save()
    .then(result => {
      console.log(`Saved new ily:`, result);
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

/**
 * GET /ily
 * Returns all ilies
 */
router.get('/ily', (req, res) => {
  Ily.find({}, null, { sort: { timestamp: -1 } })
    .then(results => {
      console.log(`${results.length} ily's found`);
      res.json(results);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

/**
 * GET /ily/:timestamp
 * Returns ilies after the given timetsamp
 */
router.get('/ily/:timestamp', (req, res) => {
  Ily.find({ timestamp: { $gte: req.params.timestamp } }, null, {
    sort: { timestamp: -1 },
  })
    .then(results => {
      console.log(`${results.length} ily's found`);
      res.json(results);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

/**
 * DELETE /ily/:id
 * Removes the specified ily
 */
router.delete('/ily/:id', (req, res) => {
  const ily = new Ily({ _id: req.params.id });
  ily
    .remove()
    .then(result => {
      console.log(result);
      console.log(`Removed ily ${req.params.id}`);
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = router;
