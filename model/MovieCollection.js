module.exports = MovieCollection

var MovieCache= new Array();

function MovieCollection(name, id, movies) {
    this.name = name;
    this.id = id;
    this.MovieCache = movies;
}