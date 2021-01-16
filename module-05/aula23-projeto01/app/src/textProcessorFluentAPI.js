'use strict';

const { evaluateRegex } = require('./utils')
const Person = require('./person')

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
        this.#content = this.#content.map(line => line.map(field => field.replace(regexTrim, '')))
        return this
    }

    mapPerson() {
        this.#content = this.#content.map(line => new Person(line))
        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI
