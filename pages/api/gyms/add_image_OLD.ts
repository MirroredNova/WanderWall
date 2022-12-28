import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  id: string,
  fileName: string,
): Promise<{fields: formidable.Fields; files: formidable.Files}> => {
  const options: formidable.Options = {};
  options.uploadDir = path.join(process.cwd(), `/public/images/${id}`);
  options.filename = (name, ext, formPath) => {
    const patt1 = /\.[0-9a-z]+$/i;
    const fileExt = formPath.originalFilename!.match(patt1);
    return `${fileName}${fileExt![0]}`;
  };

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
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

  try {
    await fs.readdir(path.join(`${process.cwd()}/public`, `/images/${query.id}`));
  } catch (err: any) {
    await fs.mkdir(path.join(`${process.cwd()}/public`, `/images/${query.id}`));
  }

  const file = await readFile(req, query.id, query.name);
  res.json(file);
}
