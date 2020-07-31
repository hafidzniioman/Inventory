const express = require('express')
const { route } = require('.')
const router = express.Router()
const Inventory = require('../models/inventory')
const Book = require('../models/book')

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
        res.redirect(`inventory/${newInventory.id}`)
    } catch{
        res.render('inventory/new', {
        inventory: inventory,
        errorMessage: 'Error creating new inventory'
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id)
        const books = await Book.find({inventory: inventory.id}).limit(6).exec()
        res.render('inventory/show', {
            inventory: inventory,
            booksByInventory: books
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
    res.send('Show inventory' + req.params.id)
})

router.get('/:id/edit', async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id)
        res.render('inventory/edit', {inventory: inventory})
    } catch {
        res.redirect('/inventory')
    }
})

router.put('/:id', async (req, res) => {
    let inventory
    try{
        inventory = await Inventory.findById(req.params.id)
        inventory.name = req.body.name
        await inventory.save()
        res.redirect(`/inventory/${inventory.id}`)
    } catch{
        if (inventory == null) {
            res.redirect('/')
        } else {
            res.render('inventory/edit', {
                inventory: inventory,
                errorMessage: 'Error updating inventory'
                })
        }
    }
})

router.delete('/:id', async (req, res) => {
    let inventory
    try{
        inventory = await Inventory.findById(req.params.id)
        await inventory.remove()
        res.redirect('/inventory')
    } catch{
        if (inventory == null) {
            res.redirect('/')
        } else {
            res.redirect(`/inventory/${inventory.id}`)
        }
    }
})

module.exports = router