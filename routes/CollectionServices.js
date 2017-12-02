module.exports = {
    'getCollections': getCollections,
    'deleteMovie':  deleteMovie,
    'deleteList': deleteList,
    'addMovie' : addMovie,
    'createCollection' : createCollection
}

function getCollections(req, name, list, cb) {
    for (i = 0; i < req.user.MovieCollections.length; i++) {
        if (req.user.MovieCollections[i].name == name) {
            list = req.user.MovieCollections[i].list;
            break;
        }
    }
    return list;
    cb();
}

function deleteMovie(req, cb) {
    req.user.MovieCollections = req.user.MovieCollections.filter(function (fl) {
        return fl.list.results.filter(function (fh) {
            return fh.id == req.body.id
        })
    })
    cb();
}

function deleteList(req, cb) {
    req.user.MovieCollections = req.user.MovieCollections.filter(function (fl) {
        return fl.name == req.body.name
    })
    cb();
}

function addMovie(req, cb) {
    var i = 0;
    for (; i < req.user.MovieCollections.length; i++)
        if (req.user.MovieCollections[i].name == req.body.collection) break;

    req.user.MovieCollections[i].list
        .results
        .push({id: req.body.id, poster_path: req.body.poster_path})

    cb();
}

function createCollection(req, cb) {
    req.user.MovieCollections.push(
        {
            name: req.body.name,
            list: {
                results: new Array()
            }
        }
    )
    cb();
}