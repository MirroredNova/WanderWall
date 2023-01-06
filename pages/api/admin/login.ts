import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const body = <{ password: string }> req.body;

  if (!body.password) res.status(400).json({ msg: 'No password sent.' });

  if (body.password === process.env.ADMIN_PASSWORD) res.status(200).json({ msg: 'success' });
  else res.status(401).json({ msg: 'Incorrect password.' });
}
