import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import ImageKit from 'imagekit';
import { verify } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

const site = process.env.NEXT_PUBLIC_SITE_URL;
const secret = process.env.NEXTAUTH_SECRET;
const api = process.env.GENIMAGE_API_URL;

const updateItem = async (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string,
) => {
  const { id } = req.query;
  const payload = verify(token);

  const body = JSON.parse(req.body);
  const page = `${site}/gitlab/commit/${body.commit.id}`;

  // Generate Evidence
  const url = encodeURIComponent(page);
  const generate = await fetch(`${api}?url=${url}`);
  const image = await generate.blob();

  // Blob to Buffer
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload Imagekit
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: 'https://ik.imagekit.io/tlk1n6viqhs/',
  });

  const upload = await imagekit.upload({
    file: buffer,
    fileName: `${id}.png`,
    folder: 'groupware_rendiriz_com',
  });

  const uploadResult = await Promise.resolve(upload);

  // Update Logbook
  const result = await prisma.logbook.update({
    where: { id: id?.toString() },
    data: {
      evidenceTask: uploadResult.url,
    },
  });

  res.status(200).json({ code: 200, data: result });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  const token = await getToken({ req, secret, raw: true });
  if (!token) {
    return res.status(401).end(`Unauthorized`);
  }

  switch (method) {
    case 'PUT':
      try {
        return updateItem(req, res, token);
      } catch (err: any) {
        return res.status(500).end(err.message);
      }
    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
