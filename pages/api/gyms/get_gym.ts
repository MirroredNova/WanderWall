import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../database/connection';
import Gym from '../../../database/schema';
import { IApiResGym } from '../../../utils/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' });
    return;
  }

  await connectDB(process.env.MONGO_CONN_STRING).catch((error) => console.error(error));
  const { query } = req;
  if (!query.id) {
    res.status(400).json({
      message: 'Query does not contain id.',
    });
  }

  const gymRes = await Gym.findOne({ _id: query.id });
  const gyms: IApiResGym = gymRes.toObject();
  if (!gyms) {
    res.status(404).json({
      message: 'This gym could not be found.',
    });
  }

  res.status(200).json(gyms);
}
