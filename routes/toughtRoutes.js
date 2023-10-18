const express = require('express')
const router = express.Router()

//Controller
const ToughtController = require('../controllers/ToughtController')

//Importar o midddleware de verificação de usuário
const checkAuth = require('../helpers/auth').checkAuth

router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.get('/add', checkAuth, ToughtController.createTought)

//Rota para mostrar o formulário
router.get('/edit/:id', checkAuth, ToughtController.editTought)

//Rota para eidtar o formulário
router.post('/edit', checkAuth, ToughtController.editToughtSave)

router.post('/add', checkAuth, ToughtController.createToughtSave)
router.post("/delete", ToughtController.deleteToughts);
router.get('/', ToughtController.showToughts)

module.exports = router