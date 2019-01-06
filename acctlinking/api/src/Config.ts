import * as fs from 'fs'

function getConfig() {
    let configFile = 'config.json'
    if( process.argv.length >2 ){
        configFile = process.argv[2]
    }
    console.log('using:' + configFile)
    var config = JSON.parse(fs.readFileSync(configFile, 'utf-8'))
    console.log('--------------------------')
    console.log(config)
    console.log('--------------------------')

    return config
}

module.exports = getConfig()