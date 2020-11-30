import mocha from 'mocha'
import chai from 'chai'
import Person from '../../src/person.js'

const { describe, it } = mocha
const { expect } = chai

describe('Person', () => {
    it('should return a person instance from a string', () => {
        const personString = '1 Carro,Moto 69000 2019-11-20 2020-11-29'
        const person = Person.generateInstanceFromString(personString)
        const expected = {
            id: '1',
            vehicles: ['Carro', 'Moto'],
            kmTravelled: '69000',
            from: '2019-11-20',
            to: '2020-11-29'
        }
        expect(person).to.be.deep.equal(expected)
    })

    it('should format values', () => {
        const person = new Person({
            id: '1',
            vehicles: ['Carro', 'Moto'],
            kmTravelled: '69000',
            from: '2019-11-20',
            to: '2020-11-29'
        })
        const result = person.formatted('pt-BR')
        const expected = {
            id: 1,
            vehicles: 'Carro e Moto',
            kmTravelled: '69.000 km',
            from: '20 de novembro de 2019',
            to: '29 de novembro de 2020'
        }
        expect(result).to.be.deep.equal(expected)
    })
})
