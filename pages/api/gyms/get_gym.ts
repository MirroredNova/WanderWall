import { NextApiRequest, NextApiResponse } from 'next';
import conn from '../../../database/connection';
import Gym from '../../../database/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  conn(process.env.MONGO_CONN_STRING).catch((error) => console.error(error));
  const { query } = req;
  if (!query.id) {
    res.status(400).json({
      message: 'Query does not contain id.',
    });
  }
  try {
    const gyms = await Gym.findOne({ _id: query.id });
    res.status(200).json(gyms);
  } catch (error) {
    res.status(404).json({
      message: 'This gym could not be found.',
    });
  }
}
