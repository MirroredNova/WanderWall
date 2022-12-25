import { NextApiRequest, NextApiResponse } from 'next';
import conn from '../../../database/connection';
import Gym from '../../../database/schema';
import { IGym } from '../../../utils/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const body = <IGym> req.body;

  conn(process.env.MONGO_CONN_STRING).catch((error) => console.error(error));
  try {
    console.log(body);
    const create = new Gym(body);
    await create.save();
    res.status(200).json(create);
  } catch (error) {
    res.status(422).json({
      message: 'Invalid Object',
    });
  }
}
