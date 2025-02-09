import { hash, verify } from "argon2";

export const encryptPassword = async (password) => {
    try {
        return await hash(password)
    } catch (error) {
        console.error('Error encrypting password',error);
    }
}

export const checkPassword = async (passwordHash,password)=>{
    try {
        return await verify(passwordHash,password)
    } catch (error) {
        console.error('Error checking password',error);
    }
}