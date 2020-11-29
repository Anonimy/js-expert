'use strict';

const { watch, promises: { readFile } } = require('fs')

class File {
    watch(event, filename) {
        // console.log('arguments -->', Array.prototype.slice.call(arguments))
        this.showContent(filename);
    }

    async showContent(filename) {
        console.log((await readFile(filename)).toString())
    }
}

const file = new File()

// watch(__filename, file.watch.bind(file))

// file.watch.call({ showContent: () => console.log('call') }, null, __filename)
file.watch.call({ showContent: () => console.log('apply') }, [null, __filename])
