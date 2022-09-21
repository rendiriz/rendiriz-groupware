import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { verify } from '@/lib/jwt';

const secret = process.env.NEXTAUTH_SECRET;

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const token = await getToken({ req, secret, raw: true });
  if (token) {
    const payload = verify(token);

    console.log('JSON Web Token', JSON.stringify(payload, null, 2));
  }

  res.status(200).json({ name: 'John Doe' });
}
