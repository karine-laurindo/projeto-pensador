const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController{
  static async showToughts(req, res){
  return res.render('toughts/home')
  }
  static async dashboard(req,res){
    const UserId = req.session.userId
  }
  static async dashboard(req, res){
    return res.render('toughts/dashboard')
  }
  static createTought(req, res){
    return res.render('toughts/create')
  }
  static async createToughtSave(req, res){
    const tought = {
      title: req.body.title,
      UserId: req.session.UserId
    }
    try {
      await Tought.create(tought)
      req.flash('message', 'Pensamento criado com sucesso!')

      req.session.save(() => {
        res.redirect('/tougths/dashboard')
      })
    } catch (error) {
      console.log(`Aconteceu um erro ${error} `)
    }
  }
}