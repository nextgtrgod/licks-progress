const fs = require('fs')
const path = require('path')
const readFile = require('./utils/readFile')
const writeFile = require('./utils/writeFile')

class Controller {
	constructor() {

		this.path = path.join(__dirname, 'data.json')
	}

	async get() {
		let data = await readFile(this.path)

		return data
	}

	async update(data) {

		await writeFile(data, this.path)

		console.log(data)

		return data
	}

	async patch() {
		let items = await readFile(this.path)

		items = items.map((item, i) => {

			return {
				id: i + 1,
				...item,
			}
		})

		await writeFile(items, this.path)

		return items
	}
}

const controller = new Controller()

module.exports = controller
