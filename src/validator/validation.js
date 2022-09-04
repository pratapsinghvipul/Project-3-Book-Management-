//------------------------------------------------validation for empty field----------------------------------------------//

const isValid = function(value){
    if(typeof value === "undefined" || value === null) return false
    if(typeof value === "string" && value.trim().length === 0 ) return false
    if(typeof value === Number && value.trim().length===0) return false
    return true;
}

//------------------------------------------------validation for email----------------------------------------------//

const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
          }

  //------------------------------------------------validation for ISBN Number----------------------------------------------//

const validISBN = (value) =>{
let regex =   /^((?:-13)?:?\ *(97(?:8|9)([ -]?)(?=\d{1,5}\2?\d{1,7}\2?\d{1,6}\2?\d)(?:\d\2*){9}\d))$/
 return regex.test(value);
}

//------------------------------------------------validation for phone number----------------------------------------------//

const regexNumber = function(val){
    let regx = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
    return regx.test(val);
}

//----------------------------------------validation for not allowing number in name field-----------------------------------//

const regexValidator = function (val) {
    let regx = /^[a-zA-Z ]{1,100}$/;
    return regx.test(val);
}

//------------------------------------------------validation for password----------------------------------------------//

const passwordValidate = function(value){
 let regex =    /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9!@#$%^&*]{8,15})$/
 return regex.test(value)
}

//--------------------------------------validation for rating allowing number from 0 to 5-------------------------------------//

const ratingValidator = function(value){
  let regex = /^([0-4]*\.[0-9]+|[0-5])$/
  return regex.test(value)
}

module.exports={validateEmail,isValid,validISBN , regexNumber , regexValidator,passwordValidate, ratingValidator}
          