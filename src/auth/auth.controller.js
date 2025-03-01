import User from '../user/user.model.js';
import { checkPassword } from '../../utils/encrypt.js';
import { generateJwt } from '../../utils/jwt.js';

//LOGIN DE USUARIOS
export const login = async(req, res)=>{
    try {

        const {userLoggin, password} = req.body;

        const user = await User.findOne(
            {
                $or : [
                    {email : userLoggin},
                    {username : userLoggin}
                ]
            }
        );

        if(user && await checkPassword(user.password, password)){
            let loggedUser = {
                uid : user._id,
                name : user.name,
                username : user.username,
                role : user.role
            };

            let token = await generateJwt(loggedUser);

            return res.send({message : `Welcome, ${user.name}`, loggedUser, token});
        };
        return res.status(404).send({message : 'Wrong email or password'});
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({message: 'General error with login function', error});
    }
}