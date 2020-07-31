const mongoose = require('mongoose')
const Book = require('./book')

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

inventorySchema.pre('remove', function(next){
    Book.find({inventory: this.id}, (err, book) => {
        if (err) {
            next(err)
        } else if (books.length > 0) {
            books.forEach(book => book.remove())
            next(new Error('This inventory has books still'))
        } else {
            next()
        }
    })
})

module.exports = mongoose.model('Inventory', inventorySchema)