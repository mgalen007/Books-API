import express from 'express'
import 'dotenv/config'
import Book from '../models/books.js'

const router = express.Router()

router.route('/')
    .get(async (req, res) => {
        try{
            const books = await Book.find()
            res.json(books) 
        }
        catch(error){
            console.log('Error: ', error)
            res.status(500).json({
                message: 'Something went wrong, please try again later.'
            })
        }
    })
    .post(async (req, res) => {
        try{
            const newBook = new Book({
                title: req.body.title,
                author: req.body.author,
                quantity: req.body.quantity
            })
            const savedBook = await newBook.save()
            res.status(201).json(savedBook)
        } 
        catch(error){
            res.status(500).json({
                message: 'Something went wrong, please try again later.'
            })
        }
    })

router.route('/:title')
    .get(async (req, res) => {
        try{
            const book = await Book.findOne({title: req.params.title})
            if (!book) res.status(404).json({message: 'Book not found'})
            res.json(book)
        }
        catch(error){
            console.log('Error: ', error)
            res.status(500).json({
                message: 'Something went wrong, please try again later.'
            })
        }end
    })
    .delete(async (req, res) => {
        try{
            const deletedBook = await Book.findOneAndDelete({title: req.params.title})
            if (!deletedBook) res.status(404).json({message: 'Book not found'})
        }
        catch(error){
            console.log('Error: ', error)
            res.status(500).json({
                message: 'Something went wrong, please try again later.'
            })
        }
    })
    .put(async (req, res) => {
        try{
            const toUpdate = await Book.findOne({title: req.params.title})
            if (!toUpdate) res.status(404).json({message: 'Book not found'})
            const newBook = new Book({
                title: req.body.title,
                author: req.body.author,
                quantity: req.body.quantity
            })
            const updatedBook = await Book.findOneAndReplace(toUpdate, newBook, {new: true})
            res.json(updatedBook)
        }
        catch(error){
            console.log('Error: ', error)
            res.status(500).json({
                message: 'Something went wrong, please try again later.'
            })
        }
    })

router.get('/:title/author', async (req, res) => {
    const book = await Book.findOne({title: req.params.title})
    if (!book) res.status(404).json({message: 'Book not found'})
    res.json(book.author)
})

export default router