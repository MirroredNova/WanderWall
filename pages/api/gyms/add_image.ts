/* eslint-disable no-param-reassign */
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query } = req;

  if (typeof query.id !== 'string' || typeof query.name !== 'string') {
    res.status(400).send({ message: 'Query parameters invalid' });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const mainDir = `${process.cwd()}/public/images/${query.id}`;

  try {
    await fs.readdir(mainDir);
  } catch (err: any) {
    await fs.mkdir(mainDir);
  }

  const form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', (name, file) => {
    const patt1 = /\.[0-9a-z]+$/i;
    const fileExt = file.originalFilename!.match(patt1);
    file.filepath = `${mainDir}/${query.name}${fileExt}`;
  });

  res.status(200).json({ message: 'yippe' });
}
