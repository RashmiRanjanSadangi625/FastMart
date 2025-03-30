const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://rrs:<db_password>@ecommerce.4dllk.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDb = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas successfully!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // Exit process on failure
  }
};

module.exports = { connectDb, client };
