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
  saveLocally: boolean,
): Promise<{fields: formidable.Fields; files: formidable.Files}> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), '/public/images');
    options.filename = (name, ext, formPath, form) => `${Date.now().toString()}_${formPath.originalFilename}`;
  }

  options.maxFileSize = 4000 * 1024 * 1024;
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
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  try {
    await fs.readdir(path.join(`${process.cwd()}/public`, '/images'));
  } catch (err: any) {
    await fs.mkdir(path.join(`${process.cwd()}/public`, '/images'));
  }
  await readFile(req, true);
  res.json({ message: 'image created' });
}
