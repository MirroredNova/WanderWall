import mongoose from 'mongoose';

const conn = async (connString: string) => {
  mongoose.connect(connString);
  mongoose.set('strictQuery', true);
  console.log('Database Connected');
};

export default conn;
