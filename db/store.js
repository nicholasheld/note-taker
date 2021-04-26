const util = require('util');
const fs = require('fs');
const uniqid = require('uniqid');

const readFileAsynch = util.promisify(fs.readFile);
const writeFileAsynch = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsynch('db/db.json', 'utf8')
    }
    write(note) {
        return writeFileAsynch('db/db.json', JSON.stringify(note))
    }
    getNotes()  {
        return this.read().then((notes) => {
            let parsedNotes;
            try{
                parsedNotes = [].concat(JSON.parse(notes))
            }
            catch (err){
                parsedNotes = []
            }
            return parsedNotes;
        })
    }
    addNote(note)   {
        const {title, text } = note
        const newNote = {title, text, id:uniqid()}
        
        return this.getNotes()
        .then((notes) => {[...notes, newNote]})
        .then((updatedNotes) => {this.write(updatedNotes)})
        .then(() => {newNote}) 
    }
}
module.exports = new Store()