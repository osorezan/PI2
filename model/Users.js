module.exports = User

var collections= new Array();

function MovieCollection(name, collections) {
    this.name = name;
    if (collections)
        this.collections = collections;
}