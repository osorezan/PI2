module.exports = Movie

function Movie(movieDetails, cast) {
    this.title = movieDetails.title
    this.original_title = movieDetails.original_title
    this.genres = movieDetails.genres
    this.original_language = movieDetails.original_language
    this.overview = movieDetails.overview
    this.id = movieDetails.id
    this.release_date = movieDetails.release_date
    this.tagline = movieDetails.tagline
    this.vote_average = movieDetails.vote_average
    this.poster_path = movieDetails.poster_path
    this.cast = cast.cast
    if(movieDetails.videos.results[0] != null)
        this.video = movieDetails.videos.results[0].key
    if(movieDetails.images.backdrops[0]!= null)
        this.images = movieDetails.images.backdrops[0].file_path

}