import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { IImgFolder } from '../../../utils/types';

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

  const folders: IImgFolder[] = [];
  const gymFolders = fs.readdirSync(imagesFolder);
  gymFolders.forEach((folder) => {
    let imageFiles = fs.readdirSync(imagesFolder + folder);
    imageFiles = imageFiles.filter((file) => file.includes(content));
    folders.push({
      id: folder,
      images: imageFiles,
    });
  });
  res.status(200).json({ folders });
}
