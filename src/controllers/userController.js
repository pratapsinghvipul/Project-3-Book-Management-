const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const {validateEmail,isValid , regexNumber , regexValidator, passwordValidate} = require('../validator/validation')

//------------------------------------------------createUser----------------------------------------------//

const createUser = async function(req,res){
  try{
     let data =req.body
     let { title, name, phone,email,password} = data
     let titleValues = ["Mr","Mrs", "Miss"];
if(Object.keys(data).length==0) {return res.status(400).send({status: false, message: "please enter the data"})}
if(!isValid(phone) || !regexNumber(phone)){return res.status(400).send({message:" please enter phone number correctly"})}
if(!isValid(title) || !titleValues.includes(title)){ return res.status(400).send({message:"please enter title correctly"})}
if(!isValid(name) || !regexValidator(name)){ return res.status(400).send({message:"please enter name correctly"}) }
if(!isValid(email) || !validateEmail(email)){return res.status(400).send({message:"please enter email correctly"}) }
if(!isValid(password) || !passwordValidate(password)) {return res.status(400).send({message:"please enter password correctly"}) }

let checkEmail = await userModel.findOne({email:email})
if(checkEmail){return res.status(400).send({message:"email is already regesterd"})}

let checkPhone = await userModel.findOne({phone:phone})
if(checkPhone){return res.status(400).send({message:"phone is already regesterd"})}

let saveData = await userModel.create(data)

return res.status(201).send({  status: true, message: 'Success', data:saveData})
}
catch(error){ res.status(500).send({ status:false,message:error.message})}
}

//------------------------------------------------loginUser----------------------------------------------//

const loginUser = async function(req, res){
try { 
    let data = req.body
    let {email , password} = data

if(Object.keys(data).length==0) {return res.status(400).send({status: false, message: "please enter the data"})}
if(!isValid(email) ||!validateEmail(email)) {return res.status(400).send({status:false,message:"please enter email correctly"}) }
if(!isValid(password) || ! passwordValidate(password)) {return res.status(400).send({status:false,message:"please enter password correctly"}) }

let checkCredentials = await userModel.findOne({email:email,password:password})
if(!checkCredentials){ return res.status(400).send({status:false,message:"please enter valid email or password"})}

userId = checkCredentials._id
let token = jwt.sign(
    {
        userId: userId.toString(),
        batch: "radon",
        organisation: "project-3",
    },
    "ourThirdProject" , {
        expiresIn:'3600s'
    }
);
res.status(201).setHeader("x-api-key", token);
res.status(201).send({ status: true, token: token });
}
catch(error){ res.status(500).send({ status:false,message:error.message})}
}

module.exports.createUser = createUser
module.exports.loginUser = loginUser