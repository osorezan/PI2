'use strict'

const Movie = require('../model/Movie')
const Actor = require('../model/Actor')
const RateLimiter = require('request-rate-limiter')
const limiter = new RateLimiter({
    rate:40,
    interval:10,
    backofCode:429,
    backofTime:9,
    maxWaitingTime:9
})

var movieCache = new Array();
var actorCache = new Array();

module.exports = init

function init(dataSource) {
    let req
    if (dataSource)
        req = dataSource
    else
        req = require('request')

    const services = {
        getMovies,
        getMultipleMovies,
        getActorDetails,
        getMovieDetails,
        getMoviesPage: getMovies
    }
    return services

    function reqAsJson(path, cb) {
        limiter.request({url: path,method:'GET'}, (err, res) => {
            if (err) return cb(err)
            const obj = JSON.parse(res.body)
            cb(null, obj)
        })
    }

    function getMultipleMovies(movies, cb){
        var list = new Object();
        list.results = new Array();
        var i = 0;
        for (var i = 0; i < movies.length; i++) {
            list.results[i] = getMovieDetails(movies[i].id, (err, data) => {
                if (err)
                    return err;
                list.results[i] = data;
                return data;
            })
        }

        list.results = movies;

        cb(null, list)
    }

    function getMovies(page, name, cb){
        const path = `https://api.themoviedb.org/3/search/movie?api_key=668c5f272f87669446f01cfcc3ab13f4&query=${name}&page=${page}`;
        reqAsJson(path, (err, list) => {
            if (err) return cb(err);
            page ++;
            var hasNextPage = (list.total_pages >= page) ? `http://localhost:3000/Movies?name=${name}&page=${page}` : null;
            cb(null, {list, page, hasNextPage });
        });
    }

    function getActorDetails(actorId , cb){

        if (actorCache[actorId] == null) {
            const actorPath = `https://api.themoviedb.org/3/person/${actorId}?api_key=668c5f272f87669446f01cfcc3ab13f4`
            const charPath = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=668c5f272f87669446f01cfcc3ab13f4`
            reqAsJson(actorPath, (err, actor) => {
                if (err) return cb(err)
                reqAsJson(charPath, (err, char) => {
                    if (err) return cb(err)
                    cb(null, cacheActor(actor, char, actorId))
                })
            })
        }
        else cb(null, actorCache[actorId])
    }

    function cacheActor(actor, char, actorId){
        var a = new Actor(actor, char);
        actorCache[actorId] = a;
        return a;
    }

    function getMovieDetails(movieId, cb){
        //TODO, search a cache first
        if (movieCache[movieId] == null) {
            const moviePath = `https://api.themoviedb.org/3/movie/${movieId}?api_key=668c5f272f87669446f01cfcc3ab13f4&append_to_response=videos,images`;
            const charPath = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=668c5f272f87669446f01cfcc3ab13f4`;
            reqAsJson(moviePath, (err, movie) => {
                if (err) return cb(err)
                reqAsJson(charPath, (err, char) => {
                    if (err) return cb(err)
                    cb(null, cacheMovie(movie, char, movieId))
                });
            });
        }
        else cb(null, movieCache[movieId])
    }

    function cacheMovie(movie, char, movieId){
        var m = new Movie(movie, char);
        movieCache[movieId] = m;
        return m;
    }

}