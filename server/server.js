
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const portfolioRoutes = require('./routes/portfolio.routes');
const authRoutes = require('./routes/auth.routes'); 


dotenv.config();


connectDB();


const app = express();




const frontendUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.trim() : null;


const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:3000', 
];


if (frontendUrl) {
    
    allowedOrigins.push(frontendUrl);
    
    
}


app.use(cors({
  origin: function (origin, callback) {
    
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
          
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));




app.use(express.json());




app.use('/api/portfolios', portfolioRoutes); 
app.use('/api/auth', authRoutes);          




module.exports = app; 


if (require.main === module) {

    const PORT = process.env.PORT || 5001;


    app.listen(PORT, () => {
        console.log(`✅ Server is running locally on ${PORT}`);
    });
}