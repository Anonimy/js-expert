'use strict';

const TextProcessorFluentAPI = require('./textProcessorFluentAPI')

class TextProcessorFacade {
    #textProcessorFluentAPI

    constructor(text) {
        this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text)
    }

    getPeopleFromPDF() {
        return this.#textProcessorFluentAPI
            .extractPeopleData()
            .splitTextIntoColumns()
            .removeEmptyCharacters()
            .mapPerson()
            .build()
    }
}

module.exports = TextProcessorFacade
