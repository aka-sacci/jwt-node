const modelUserLogin = require("../database/models").userlogin

interface IUserLogin {
    email: string,
    password: string
}

class userLoginService {
    async execute({email, password}: IUserLogin) {
        const authUser = await modelUserLogin.findOne({
            where: {
                email: email,
                password: password
              }
        }).then((result) => {
            return {
                data: result,
                error: false
            }
        }).catch((err) => {
            return { 
                dataErr: err,
                error: true
            }
        })
        
        if(authUser.data != null){
            return {
                success: true,
                status: 200    
            }
        }else{
            return authUser.error == true ? {success: false, data: authUser.dataErr, status: 500 } :
            {success: false, message: "Login ou senha incorretos!", error: false, status: 404}
        }

    }
}

module.exports = userLoginService