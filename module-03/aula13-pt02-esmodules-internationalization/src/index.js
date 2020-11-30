import database from '../database.json'
import Person from './person.js'
import TerminalController from './terminalController.js'

const DEFAULT_LANG = 'pt-BR'
const STOP_TERMINAL = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
    try {
        const answer = await terminalController.question('? ')
        if (answer === STOP_TERMINAL) {
            terminalController.closeTerminal()
            console.log('Process finished')
            return
        }
        const person = Person.generateInstanceFromString(answer)
        // 2 Bike,Carro 2000000 2020-11-29 2020-12-01
        // console.log('person', person.formatted(DEFAULT_LANG))
        return mainLoop()
    } catch (err) {
        console.log('DEU RUIM**', err)
        return mainLoop()
    }
}

await mainLoop()
