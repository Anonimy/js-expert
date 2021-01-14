'use strict';

class TextProcessorFluentAPI {
    // prop privada! (em stage 3 do javascript)
    #content

    constructor(content) {
        this.#content = String(content)
    }

    extractPeopleData() {
        const matchPerson = /(?<=(?:contratada|contratante):\s{1})(?!\s)(.*\n.*?)$/gmi
        const onlyPerson = this.#content.match(matchPerson)
        this.#content = onlyPerson
        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI
