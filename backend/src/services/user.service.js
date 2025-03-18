const User = require("../models/user.model");
const bcrypt = require('bcrypt')
const jwtProvider= require("../config/jwtProvider.js");

// const createUser=async(userData)=>{
//   try
//   {
//     let{firstName,lastName,email,password}=userData;

//     const isUserExist=await User.findOne({email})
//     if(isUserExist)
//     {
//         throw new Error(`User already exists with email: ${email}`);
//     }
//     password=await bcrypt.hash(password,8);

//     const user=await User.create({firstName,lastName,email,password})
//     console.log(user);
//     return User;
//   } 
//   catch(error){
//     throw new Error(error.message)

//   } 
// }
const createUser = async (userData) => {
    try {
      let { firstName, lastName, email, password } = userData;
  
      const isUserExist = await User.findOne({ email });
      if (isUserExist) {
        throw new Error(`User already exists with email: ${email}`);
      }
  
      if (!password) {
        throw new Error("Password is required");
      }
  
      password = await bcrypt.hash(password, 8);
  
      const user = await User.create({ firstName, lastName, email, password });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }; 
  


const findUserById=async(userId)=>{
    try     
    {
        const user=await User.findById(userId)
        .populate("address");
        if(!user)
        {
            throw new Error("user not found with ID:",userId);
        }        
        return user;
    }catch (error) {throw new Error(error.message)
    }
}
const getUserByEmail=async(email)=>{
    try 
    {
        const user=await User.findOne({email});
        if(!user)
        {
            throw new Error("user not found with email :",email);
        }        
        return user;
    }catch (error) {throw new Error(error.message)
    }
}

// const getUserProfileByToken=async(token)=>{
//     try     
//     {
//         const userId=jwtProvider.getUserIdFromToken(token);

//         const user=await findUserById(userId).populate("addresses");
//         if(!user)
//             {
//                 throw new Error("user not found with id :",userId);
//             }
//             return user;
//     } catch (error) {throw new Error(error.message)}    
// }
const getUserProfileByToken = async (token) => {
    try {
        console.log("Received Token:", token); // Log token to check if it's valid

        const userId = jwtProvider.getUserIdFromToken(token);
        console.log("Extracted User ID:", userId); // Log userId to verify extraction

        const user = await findUserById(userId);
        console.log("Fetched User:", user); // Log user data

        if (!user) {
            throw new Error(`User not found with id: ${userId}`);
        }

        return user;
    } catch (error) {
        console.error("Error in getUserProfileByToken:", error.message);
        throw new Error(error.message); // Ensure error message is correctly thrown
    }
};


const getAllUsers=async()=>
    {
    try {
        const users=await User.find();
        return users;
        
    } catch (error) {throw new Error(error.message)}
}
module.exports={
    createUser,
    findUserById,
    getUserByEmail,
    getUserProfileByToken,
    getAllUsers
};