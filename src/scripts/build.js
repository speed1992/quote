const fs = require('fs')
const { createFile, getDateInLocalFormat } = require('./utils/utils')
const path = './src/scripts/buildDate.json'

const buildInfo = {}
buildInfo.buildDateTime = getDateInLocalFormat()

createFile(path).then(() => {
    fs.writeFile(path, JSON.stringify(buildInfo), function (err) {
        if (err) {
            return console.log(err)
        }
        console.log('Updating App Version to', buildInfo.buildDateTime, '\n')
    })
})
