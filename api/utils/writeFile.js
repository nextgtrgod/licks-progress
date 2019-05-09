const fs = require('fs')

let writeFile = async (data, path) => new Promise((resolve, reject) => {

	if (typeof data !== 'string') data = JSON.stringify(data)

	fs.writeFile(path, data, (err, data) => {
		if (err) {
			reject({ status: 'error', error: err })
			throw err
		}

		resolve({ status: 'success' })
	})
})

module.exports = writeFile
