const express = require('express')
const router = express.Router()
const service = require('./dataServices')()
const url = require('url')

router.get('/MovieDetail', (req, resp, next) => {

    const urlObj = url.parse(req.url, true)

    service.getMovieDetails(urlObj.query.movieId,(err, data) => {
    if(err) return next(err)
    resp.render('MovieDetailView', data)
})
})
router.get('/Actor', (req, resp, next) => {

    const urlObj = url.parse(req.url, true)
    service.getActorDetails(urlObj.query.actorId, (err, data) => {
    if(err) return next(err)
    resp.render('ActorView', data)
})
})
router.get('/Movies', (req, resp, next) => {
    const urlObj = url.parse(req.url, true)
    var page
    if (typeof(urlObj.query.page) != 'undefined')
        page = urlObj.query.page;
    else
        page = 1;
    service.getMoviesPage(page, urlObj.query.name, (err, data) => {
    if (err) return next(err)
    resp.render('MoviesListView', data)
})
})

router.get('', (req, resp, next) => {
    resp.render('SearchMoviesView')
})

//TODO, rest
module.exports = router