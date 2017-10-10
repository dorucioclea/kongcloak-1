'use strict'

const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/free', function (req, res) {
  res.json(['cat', 'dog', 'cow'])
})

app.get('/paid', function (req, res) {
  if (!req.headers['authorization']) return res.end()
  let roles = getRoles(req)
  if (roles.includes('subscriber'))
    res.json(['super cat', 'super dog', 'super cow'])
  else
    res.json({ message: 'Nope, pay first' })
})

app.listen(3001)

function getRoles (req) {
  let encToken = req.headers['authorization'].replace(/Bearer\s/, '')
  let decToken = jwt.decode(encToken)
  let clientAccess = decToken.resource_access['demo-client']
  return clientAccess && clientAccess.roles ? clientAccess.roles : []
}
