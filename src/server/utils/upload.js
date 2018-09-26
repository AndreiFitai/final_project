const cloudinary = require('cloudinary')
const config = require('../config')
const fs = require('fs')
const base64url = require('base64url')
const QRCode = require('qrcode')

cloudinary.config({
    cloud_name: config.CLOUDINARY_NAME,
    api_key: config.CLOUDINARY_KEY,
    api_secret: config.CLOUDINARY_SECRET,
})

function upload(file) {
    return new Promise((resolve, reject) => {
        file.mv(`tmp/${file.name}`, function (err) {
            if (err) return reject(err)
            cloudinary.uploader.upload(`tmp/${file.name}`).then(uploadResult => {
                fs.unlinkSync(`tmp/${file.name}`)
                resolve(uploadResult.secure_url)
            })
        })
    })
}

function uploadQRCode(email) {
    return new Promise((resolve, reject) => {
        QRCode.toFile('tmp/qrcode.png', `https://t.me/coinbuddybot?start=${base64url.encode(email)}`, {
            color: {
                dark: '#800080',
                light: '#000'
            }
        }).then(result => {
            console.log(result)
        }).then(e => {
            console.log(e)
            file.mv(`tmp/qrcode.png`, function (err) {
                if (err) return reject(err)
                cloudinary.uploader.upload(`tmp/qrcode.png`).then(uploadResult => {
                    fs.unlinkSync(`tmp/qrcode.png`)
                    resolve(uploadResult.secure_url)
                })
            })
        })
    })
}




module.exports = {
    upload,
    uploadQRCode
}