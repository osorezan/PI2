const userService = require('./userService')
const express = require('express')
const router = express.Router()
module.exports = router

router.use((req, res, next) => {
    next()
})

router.get('/MovieCollections', (req, resp, next) => {
    //const urlObj = url.parse(req.url, true)
    if(!req.user) return resp.redirect('/login')
    resp.render('CollectionsView', req.user)
})

router.post('/MovieCollections', (req, res, next) => {
    if(!req.user) return res.redirect('/login')
    req.user.MovieCollections.push({
        name: req.body.name,
    })
    userService.save(req.user, (err) => {
        if(err) return next(err)
        res.redirect('/MovieCollections')
    })
})