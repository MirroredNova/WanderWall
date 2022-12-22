import mongoose from 'mongoose';

const conn = async () => {
  mongoose.connect('mongodb+srv://nova:nova@wanderwall.ipblaoc.mongodb.net/?retryWrites=true&w=majority');
  mongoose.set('strictQuery', true);
  console.log('Database Connected');
};

export default conn;
