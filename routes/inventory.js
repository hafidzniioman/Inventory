const express = require('express')
const { route } = require('.')
const router = express.Router()
const Inventory = require('../models/inventory')

// All Inventory Route
router.get('/', (req, res)=>{
    res.render('inventory/index')
})

// New Inventory route
router.get('/new', (req, res)=>{
    res.render('inventory/new', {inventory: new Inventory()})
})

// Create Author Route
router.post('/', (req, res)=> {
    res.send(req.body.name)
})

module.exports = router