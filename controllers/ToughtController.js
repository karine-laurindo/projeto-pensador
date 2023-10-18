const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController{
  static async showToughts(req, res){
  return res.render('toughts/home')
  }
  static async dashboard(req, res){
    const userId = req.session.userId
    //Select join com SEQUELIZE
    const user = await User.findOne({
      where:{id:userId},
      include: Tought,
      plain:true
    })
    if(!user){
      res.redirect('/login')
    }
    // console.log(user.Toughts)
    const toughts = user.Toughts.map((result)=> result.dataValues)
    console.log(toughts)

    let emptyTought = false

    if(toughts.length === 0){
      emptyTought = true
    }

    return res.render('toughts/dashboard', {toughts})
  }
  static async deleteToughts(request,response){
    const id = request.body.id

    await Tought.destroy({where:{id:id}})
    return response.redirect('/toughts/dashboard')
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
  static async editTought(req, res){
    const id = req.params.id

    const tought = await Tought.findOne({where:{id:id}, raw:true})
    res.render('toughts/edit', {tought})
  }

  static async editToughtSave(req,res){}
}