const User = require("../models/user.model");
const bcrypt = require('bcrypt')
const jwtProvider= require("../config/jwtProvider.js"); 



const createUser = async (userData) => {
    console.log("userData",userData)
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

      console.log("userbefore",isUserExist)
  
      const user = await User.create({ firstName, lastName, email, password });
       console.log("user",user)
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

    console.log("email:", email); 
    try 
    {
        const user=await User.findOne({email});

        console.log("user:", user); 
        if(!user)
        {
            throw new Error("user not found with email :",email);
        }   
        console.log("userafter:", user);     
        return user;
    }catch (error) {throw new Error(error.message)
    }
}


const getUserProfileByToken = async (token) => {
    try {
        console.log("Received Token:", token); 

        const userId = jwtProvider.getUserIdFromToken(token);
        console.log("Extracted User ID:", userId); 

        const user = await findUserById(userId);
        console.log("Fetched User:", user); 

        if (!user) {
            throw new Error(`User not found with id: ${userId}`);
        }

        return user;
    } catch (error) {
        // console.error("Error in getUserProfileByToken:", error.message);
        throw new Error(error.message); 
    }
};

const getAdminUserByEmail = async (email) => {
    // console.log("email:", email); 
    try 
    {
        const user = await User.findOne({ email, role: "ADMIN" });

        // console.log("user:", user); 
        if(!user)
        {
            throw new Error("user not found with email :",email);
        }   
        // console.log("userafter:", user);     
        return user;
    }catch (error) {throw new Error(error.message)
    }
};

const getAllUsers=async()=>
    {
    try {
        const users=await User.find({ role: "CUSTOMER" });
        console.log("userafter:", users);     
        return users;
        
    } catch (error) {throw new Error(error.message)}
}


module.exports={
    createUser,
    findUserById,
    getUserByEmail,
    getUserProfileByToken,
    getAdminUserByEmail,
    getAllUsers
};