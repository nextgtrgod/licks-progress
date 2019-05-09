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
		let items = await readFile(this.path)

		let index = items.findIndex(item => item.id === data.id)

		items[index] = data

		await writeFile(items, this.path)

		return items
	}

	async updateAll(data) {

		await writeFile(data, this.path)

		return data
	}

	async create(data) {
		let items = await readFile(this.path)

		let maxIndex = 0

		items.map(item => item.id > maxIndex && (maxIndex = item.id))

		data.id = maxIndex + 1

		items.push(data)

		await writeFile(items, this.path)

		return items
	}

	async delete(id) {
		let items = await readFile(this.path)

		items = items.filter(item => item.id !== +id)

		await writeFile(items, this.path)

		return items
	}
}

const controller = new Controller()

module.exports = controller
