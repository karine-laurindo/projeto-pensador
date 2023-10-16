const User = require('../models/User')

//Criptografar a senha
const bcrypt = require('bcryptjs')

module.exports = class AuthController{
  static async login(req, res){
    return res.render('auth/login')
  }
  static async loginPost(req, res){
    const {email, password} = req.body

    const user = await User.findOne({where: {email:email}})

    //Validar email - login
    if(!user){
      req.flash('message', 'Usuário não encontrado')
      return res.render('/login')
    }

    //validar a senha - login
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if(!passwordMatch){
      req.flash('message', 'Senha inválida')
      res.render('/login')
      return 
    }
    req.session.userId = user.id
    req.flash('message', 'Autenticação realizada com sucesso!')
    req.session.save(()=>{
     res.redirect('/')
   })

  }
  static async register(req, res){
    return res.render('auth/register')
  }
  static async registerPost(req, res){
    const {name, email, password, confirmpassword} = req.body

    if(password != confirmpassword){
      req.flash('message', 'As senhas não conferem, tente novamente')
      return res.render('auth/register')
    }
    //Validação de email - Verificar se um email já está cadastrado
    const checkedIfUserExist = await User.findOne({where:{email:email}})
    if(checkedIfUserExist){
      req.flash('message', 'O e-mail já está em uso!')
      res.render('auth/register')
    }

    //Criptografar a senha do usuário
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    //Criar o objeto usuário para cadstro no banco
    const user = {
      name,
      email,
      password:hashedPassword
    }

    //TRY - Inserir usuário no banco e trabalhar com sessão
    try {
      const createdUser = await User.create(user)
      req.session.userId = createdUser.id
      req.flash('message', 'Cadastro realizado com sucesso!')
      req.session.save(()=>{
       res.redirect('/')
     })

    } catch (error) {
      console.log(error)
    }
  }
  // Logout
  static async logout(req, res){
    req.session.destroy()
    res.redirect('/login')
  }
}