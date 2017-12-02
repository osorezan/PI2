const userService = require('./userService')
const collectionServices = require('./CollectionServices')
const express = require('express')
const router = express.Router()
module.exports = router

router.use((req, res, next) => {
    next()
})

function saveResults() {
    userService
        .save(req.user, (err) => {
                if (err)
                    return next(err)
                res.end();
            }
        )
}


//TODO CB
router.get('/MovieCollections', (req, resp, next) => {
    //const urlObj = url.parse(req.url, true)
    if(!req.user) return resp.redirect('/login')
    resp.render('CollectionsView', req.user)
})

//TODO, cb
router.get('/MovieCollections/:name', (req, resp, next) => {
        var name = req.params.name;
        var list;
        if(!req.user)
            return resp.redirect('/login')
    list = collectionServices.getCollections(req, name, list);
        resp.render('CollectionsView', {list : list, MovieCollections : req.user.MovieCollections});
    })

//todo, push empty list
router.post('/MovieCollections', (req, res, next) => {
    if(!req.user) return res.redirect('/login')
    collectionServices.createCollection(req, saveResults());
})

router.post('/MovieCollections/Add/:_name', (req, res, next) => {
    collectionServices.addMovie(req, saveResults())
})



router.delete('/MovieCollections/:name/:id', (req, res, next) => {
    if(!req.user) return res.redirect('/login')
    collectionServices.deleteMovie(req), saveResults()
})

router.delete('/MovieCollections/:name', (req, res, next) => {
    if(!req.user) return res.redirect('/login')
    collectionServices.deleteList(req, saveResults());
})