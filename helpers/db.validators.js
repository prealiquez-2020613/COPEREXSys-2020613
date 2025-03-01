//VALIDACIONES EN RELACIÓN A LA DB

import User from '../src/user/user.model.js';
import Category from '../src/category/category.model.js';
import Company from '../src/company/company.model.js';

export const existUsername = async(username)=>{
    const alreadyUsername = await User.findOne({username});
    if(alreadyUsername){
        console.error(`Username ${username} already exist`);
        throw new error(`Username ${username} already exist`);
    }
}

export const existEmail = async(email)=>{
    const alreadyExist = await User.findOne({email});
    if(alreadyExist){
        console.error(`Email ${email} already exist`);
        throw new error(`Email ${email} already exist`);
    }
}

export const existCategory = async(name)=>{
    const alreadyExist = await Category.findOne({name});
    if(alreadyExist){
        console.error(`Category ${name} already exist`);
        throw new error(`Category ${name} already exist`);
    }
}

export const existCompany = async(name)=>{
    const alreadyExist = await Company.findOne({name});
    if(alreadyExist){
        console.error(`Company ${name} already exist`);
        throw new error(`Company ${name} already exist`);
    }
}

export const findUser = async (id)=>{
    try {
        const userExist = await User.findById(id);
        if (!userExist) return false;
        return userExist;
    } catch (error) {
        console.error(error);
        return false;
    }
}