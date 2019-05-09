const fs = require('fs')

let readFile = async (path) => new Promise((resolve, reject) => {

	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			reject(err)
			throw err
		}

		resolve(JSON.parse(data))
	})
})

module.exports = readFile
