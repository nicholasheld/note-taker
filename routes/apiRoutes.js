// LOAD DATA - this is where we get post and get
// We are linking our routes to the db
const path = require('path');
const fs = require('fs');
const Store = require('../db/store')
const router = require("express").Router()
// ROUTING

  router.get('/notes', (req, res) => {
    Store.getNotes()
    .then((notes) => {
      return res.json(notes)})
      .catch(err => res.status(500).json(err))
  })

  // API POST Requests
 router.post('/notes', (req, res) => {
   Store.addNote(req.body).then(note => {
     res.json(note)
   }).catch(err => res.status(500).json(err))
 })

module.exports = router
