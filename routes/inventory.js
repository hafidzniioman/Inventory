const express = require('express')
const { route } = require('.')
const router = express.Router()
const Inventory = require('../models/inventory')

// All Inventory Route
router.get('/', async (req, res)=>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const inventory = await Inventory.find(searchOptions)
        res.render('inventory/index', {
            inventory: inventory,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New Inventory route
router.get('/new', (req, res)=>{
    res.render('inventory/new', {inventory: new Inventory()})
})

// Create Author Route
router.post('/', async (req, res)=> {
    const inventory = new Inventory({
        name: req.body.name
    })
    try{
        const newInventory = await inventory.save()
        res.redirect(`inventory`)
    } catch{
        res.render('inventory/new', {
        inventory: inventory,
        errorMessage: 'Error creating new inventory'
        })
    }
})

module.exports = router