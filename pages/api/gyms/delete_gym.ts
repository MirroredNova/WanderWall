import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../database/connection';
import Gym from '../../../database/schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    res.status(405).send({ message: 'Only DELETE requests allowed' });
    return;
  }

  await connectDB(process.env.MONGO_CONN_STRING).catch((error) => console.error(error));
  const { body } = req;
  try {
    const gyms = await Gym.findByIdAndDelete(body._id);
    res.status(200).json(gyms);
  } catch (error) {
    console.log(error);
    res.status(422).json({
      message: 'Gym not found.',
    });
  }
}
