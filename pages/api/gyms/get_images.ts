import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' });
    return;
  }

  const { content } = req.query;
  const imagesFolder = `${process.cwd()}/public/images/`;

  if (typeof content !== 'string') {
    res.status(404);
    return;
  }

  fs.readdir(imagesFolder, (err, files) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }

    console.log(files);
  });
}
