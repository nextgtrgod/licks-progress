
class Events {
	constructor() {
		this.list = {}
		this.log = true
	}

	on(name, cb) {
		if (this.list[name]) return this.list[name].push(cb)

		this.list[name] = []
		this.list[name].push(cb)
	}

	emit(name, payload = {}) {
		if (this.log) console.log(`emit event: '${name}'`, payload)

		if (!this.list[name]) return

		this.list[name].map(cb => cb(payload))
	}

	off(name, offCb) {
		if (!this.list[name]) return

		this.list[name] = this.list[name].filter(cb => cb !== offCb)
	}
}

let events = new Events()

export default events
