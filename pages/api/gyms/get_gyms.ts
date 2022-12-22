import { NextApiRequest, NextApiResponse } from 'next';
import conn from '../../../database/connection';
import Gym from '../../../database/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  conn().catch((error) => console.error(error));

  const gyms = await Gym.find({}).select('name overallRating');
  res.status(200).json(gyms);
}
