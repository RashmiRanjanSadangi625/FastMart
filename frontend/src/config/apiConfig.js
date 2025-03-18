import axios from "axios"

export const API_BASE_URL = 'mongodb+srv://admin:admindb@learning.mh6j7.mongodb.net/featuredb?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection established successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const jwt=localStorage.getItem("jwt");

export const api=axios.create({
    baseURL :API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${jwt}`,
        "Content-Type":"application/json"
    }
})
