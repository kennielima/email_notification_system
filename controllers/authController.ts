import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/UserModel';

dotenv.config();

const register = async (req: any, res: any) => {
    const { email, password } = req.body;
     const hashedPassword = await bcrypt.hash(password, 10);
     console.log(req.body, hashedPassword)

     try {
        const user = await createUser(email, hashedPassword);
        console.log(user)
        return res.status(201).json({ message: 'User registered', user })
     }
     catch(error){
        console.error("error creating account:", error)
        return res.status(500).json({ message: "Failed to register:", error})
     }
}


const login = async (req: any, res: any) => {
    const { email, password } = req.body;
    console.log(req.body)
    
    try {
    const user = await findUserByEmail(email)
    const jwtSecret = process.env.JWTSECRET || 'defaultsecretkey';

    if (!user){
        return res.status(401).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ user: user.id }, jwtSecret, { expiresIn: '1day'})

    res.json({ message: 'User logged in' })
} catch (error) {
    console.error("error logging in account:", error)
    res.status(500).json({ message: "failed to login:", error });
}
};
export { register, login }