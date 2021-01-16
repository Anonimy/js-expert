'use strict';

const { evaluateRegex } = require('./utils')

class TextProcessorFluentAPI {
    // prop privada! (em stage 3 do javascript)
    #content

    constructor(content) {
        this.#content = content
    }

    extractPeopleData() {
        const matchPerson = evaluateRegex(/(?<=(?:contratada|contratante):\s{1})(?!\s)(.*\n.*?)$/gmi)
        const onlyPerson = this.#content.match(matchPerson)
        this.#content = onlyPerson
        return this
    }

    splitTextIntoColumns() {
        const regexSplit = evaluateRegex(/,/)
        this.#content = this.#content.map(line => line.split(regexSplit))
        return this
    }

    removeEmptyCharacters() {
        const regexTrim = evaluateRegex(/^\s+|\s+$|\n/g)
        this.#content = this.#content.map(line => line.replace(regexTrim, ''))
        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI
