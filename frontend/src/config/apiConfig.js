import axios from "axios"

export const API_BASE_URL = 'mongodb+srv://rashmi:ecommerce@ecommerce.4dllk.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce';

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
