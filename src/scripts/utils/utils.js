const fs = require('fs')

module.exports.getClockTime = function () {
    var now = new Date()
    var hour = now.getHours()
    var minute = now.getMinutes()
    var second = now.getSeconds()
    var ap = 'AM'
    if (hour > 11) {
        ap = 'PM'
    }
    if (hour > 12) {
        hour = hour - 12
    }
    if (hour == 0) {
        hour = 12
    }
    if (hour < 10) {
        hour = '0' + hour
    }
    if (minute < 10) {
        minute = '0' + minute
    }
    var timeString = hour + ':' + minute + ' ' + ap
    return timeString
}

module.exports.getDateInLocalFormat = function () {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    var currentdate = new Date()
    var datetime = currentdate.getDate() + ' ' + monthNames[currentdate.getMonth()] + ' ' + currentdate.getFullYear() + ' @ ' + module.exports.getClockTime()

    return datetime
}

module.exports.createFile = function (filename) {
    return new Promise((resolve, reject) => {
        fs.open(filename, 'r', function (err, fd) {
            if (err) {
                fs.writeFile(filename, '', function (err) {
                    if (err) {
                        reject()
                        console.log(err)
                    }
                    resolve()
                })
            } else {
                resolve()
            }
        })
    })
}
