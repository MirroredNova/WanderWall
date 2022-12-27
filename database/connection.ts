import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = { conn: null, promise: null };
}

async function connectDB(connString: string) {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Connecting to DB');
    cached.promise = mongoose.connect(connString).then((mongooseThen) => mongooseThen);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
