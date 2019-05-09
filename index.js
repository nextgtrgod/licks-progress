'use strict';

const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

app.set('port', (process.env.PORT || 4000))



// all about products
let controller = require('./api/controller')

app.get('/api', async (req, res) => {

	let data = await controller.get()
	res.send({ data })
})

app.post('/api', async (req, res) => {

	let data = req.params.id === 'new'
		? await controller.create(req.body)
		: await controller.update(req.body)

	res.send({ data })
})

app.post('/api', async (req, res) => {

	let data = await controller.updateAll(req.body)

	res.send({ data })
})

app.delete('/api/:id', async (req, res) => {

	let data = await controller.delete(req.params.id)
	res.send({ data })
})


// static
// app.use('/images', express.static(path.join(__dirname, 'api', 'images')))
app.use(express.static(path.join(__dirname, 'public')))

// app.get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'))


app.listen(app.get('port'), () => console.log(`Listening on: http://localhost:${app.get('port')}`))
