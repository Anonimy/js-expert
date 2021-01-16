'use strict';

const { evaluateRegex } = require('./utils')

const regexCapitalize = evaluateRegex(/^(\w)([a-z]+$)/i)
const regexNotANumber = evaluateRegex(/\D/g)
const regexStreetName = evaluateRegex(/(?:(?:Rua)|(?:Av.))[\s\S]+$/i)
const regexDistrictName = evaluateRegex(/(?<=bairro\s)[\s\S]+$/i)
const regexPeriod = evaluateRegex(/\.$/)

class Person {
    constructor([nome, nacionalidade, estadoCivil, documento, rua, numero, bairro, estado]) {
        const capitalize = prop => prop.replace(
            regexCapitalize,
            (_, g1, g2) => `${g1.toLocaleUpperCase()}${g2.toLocaleLowerCase()}`
        )
        const removeNonNumbers = prop => prop.replace(regexNotANumber, '')
        const removeStreetPrefix = prop => prop.match(regexStreetName)[0]
        const removeDistrictPrefix = prop => prop.match(regexDistrictName)[0]
        const removePeriod = prop => prop.replace(regexPeriod, '')

        this.nome = nome
        this.nacionalidade = capitalize(nacionalidade)
        this.estadoCivil = capitalize(estadoCivil)
        this.documento = removeNonNumbers(documento)
        this.rua = removeStreetPrefix(rua)
        this.numero = numero
        this.bairro = removeDistrictPrefix(bairro)
        this.estado = removePeriod(estado)
    }
}

module.exports = Person