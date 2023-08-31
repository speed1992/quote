const fs = require('fs')

const path = './src/scripts/buildDate.json'

fs.readFile(path, 'utf8', function (err, data) {
    const buildInfo = JSON.parse(data)
    console.log('\nBuild Info :', buildInfo.buildDateTime)
})
