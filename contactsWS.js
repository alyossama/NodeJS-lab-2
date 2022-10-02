// Dependencies
const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express()
const jsonParser = bodyParser.json()

// Empty contacts array as an endpoint
var contacts = []


// Initial value for id
var id = 1;


//Show all contacts
app.get('/all-contacts', function (req, res) {
    // check if contacts array is empty or not
    if (contacts.length > 0) {
        res.send(contacts)
    }
    else {
        res.send({
            msg: "The list is empty"
        })
    }
})

// Add new contact
app.post('/add-contact', jsonParser, function (req, res) {

    // check phone duplication
    let found = contacts.map(el => el.phone).indexOf(req.body.phone) > -1
    if (found) {
        res.send({
            msg: 'Contact already exists'
        })
    }
    else {
        // ID auto-increment
        req.body.id = id++
        contacts.push(req.body)
        res.send({
            msg: 'contact added successfully!'
        })
    }
})

// Update contact
app.post('/edit-contact', jsonParser, function (req, res) {
    // Find the required contact to be updated bu its ID
    let contact = contacts.find((el) => el.id == req.body.id)

    if (typeof (contact) === 'undefined') {
        res.send({
            msg: 'Invalid ID'
        })
    }
    else {
        // assign new values to it
        contact.name = req.body.name
        contact.phone = req.body.phone
        res.send({
            msg: 'contact updated successfully!'
        })
    }


})


//Delete contact
app.get('/delete-contact', function (req, res) {
    console.log(req.query.id)
    // search for the id of the required contact to be deleted
    // let found = contacts.find((el) => el.id === req.query.id)
    let found = contacts.findIndex((el) => el.id == req.query.id)

    console.log(found)
    // Check if found or not
    if (found < 0) {
        res.send({
            msg: 'Invalid ID'
        })
    }
    else {
        contacts.splice(found, 1)
        res.send({
            msg: 'contact deleted successfully!'
        })
    }
})

app.listen(8080)