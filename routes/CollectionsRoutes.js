const userService = require('./userService')
const express = require('express')
const router = express.Router()
module.exports = router

router.use((req, res, next) => {
    // res.locals.favourites = favourites
    next()
})

router.get('/MovieCollections', (req, resp, next) => {
    //const urlObj = url.parse(req.url, true)
    resp.render('CollectionsView', req.user)
})

router.post('/MovieCollections', (req, res, next) => {
    if(!req.user) return res.redirect('/login')
    req.user.movieCollections.push({
        id: req.body.league,
        caption: req.body.caption
    })
    userService.save(req.user, (err) => {
        if(err) return next(err)
        res.redirect('/MovieCollections')
    })
})