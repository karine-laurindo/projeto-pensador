const express = require('express')
const router = express.Router()

//Controlador da ROTA
const AuthController = require('../controllers/AuthController')

router.get('/login', AuthController.login)
router.post('/login', AuthController.loginPost)
router.get('/registrar', AuthController.register)
router.post('/registrar', AuthController.registerPost)
router.get('/logout', AuthController.logout)

module.exports = router