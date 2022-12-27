import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../database/connection';
import Gym from '../../../database/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectDB(process.env.MONGO_CONN_STRING).catch((error) => console.error(error));

  const gyms = await Gym.find({}).select('name overallRating location');
  if (gyms.length === 0) res.status(404).json({ message: 'No gyms found' });
  else res.status(200).json(gyms);
}
