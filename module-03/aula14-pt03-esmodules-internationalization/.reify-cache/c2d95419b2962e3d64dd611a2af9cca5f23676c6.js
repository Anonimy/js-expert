"use strict";module.export({default:()=>Person});class Person {
    constructor({ id, vehicles, kmTravelled, from, to }) {
        this.id = id
        this.vehicles = vehicles
        this.kmTravelled = kmTravelled
        this.from = from
        this.to = to
    }

    formatted(language) {
        const mapDate = dateString => {
            const [year, month, day] = dateString.split('-').map(Number)
            return new Date(year, month - 1, day)
        }

        return {
            id: Number(this.id),
            vehicles: new Intl
                .ListFormat(language, { style: 'long', type: 'conjunction' })
                .format(this.vehicles),
            kmTravelled: new Intl
                .NumberFormat(language, { style: 'unit', unit: 'kilometer' })
                .format(this.kmTravelled),
            from: new Intl
                .DateTimeFormat(language, { day: '2-digit', month: 'long', year: 'numeric' })
                .format(mapDate(this.from)),
            to: new Intl
                .DateTimeFormat(language, { day: '2-digit', month: 'long', year: 'numeric' })
                .format(mapDate(this.to)),
        }
    }

    static generateInstanceFromString(text) {
        const EMPTY_SPACE = ' '
        const [id, vehicles, kmTravelled, from, to] = text.split(EMPTY_SPACE)
        const person = new Person({
            id,
            kmTravelled,
            from,
            to,
            vehicles: vehicles.split(','),
        })
        return person
    }
}
