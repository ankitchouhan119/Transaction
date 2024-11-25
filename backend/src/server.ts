import app from './app';
import connectDB from './config/database';

const PORT = process.env.PORT || 7000;

connectDB().then(() =>{
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
      
})

