const  mongoose  = require("mongoose");

// const mongodbUrl="mongodb+srv://rashmi:ecommerce@cluster0.b24gn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb = async()=>{
    return await mongoose.connect("mongodb://localhost:27017/?directConnection=true");
    // console.log(conn);
}

module.exports={connectDb}
