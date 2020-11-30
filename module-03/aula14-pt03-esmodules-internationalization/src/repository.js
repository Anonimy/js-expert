import { writeFile, readFile } from 'fs/promises'

export const save = async data => {
    // nao tem __filename, __dirname, require...
    const { pathname } = new URL('./../database.json', import.meta.url)
    const databaseFile = pathname.replace('/', '')
    const currentData = JSON.parse(await readFile(databaseFile))
    currentData.push(data)
    await writeFile(databaseFile, JSON.stringify(currentData))
}
