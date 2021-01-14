'use strict';

const { readFile } = require('fs/promises')
const path = require('path')
const pdf = require('pdf-parse');

;(async () => {
    const dataBuffer = await readFile(path.join(__dirname, '../../../docs/contrato.pdf'))
    const data = await pdf(dataBuffer)
    console.log(data.text)
})()
