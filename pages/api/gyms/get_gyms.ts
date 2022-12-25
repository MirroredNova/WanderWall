import { NextApiRequest, NextApiResponse } from 'next';
import conn from '../../../database/connection';
import Gym from '../../../database/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  conn(process.env.MONGO_CONN_STRING).catch((error) => console.error(error));

  const gyms = await Gym.find({}).select('name overallRating location');
  res.status(200).json(gyms);
}
