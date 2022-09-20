import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const token = await getToken({ req });

  console.log('JSON Web Token', JSON.stringify(token, null, 2));

  res.status(200).json({ name: 'John Doe' });
}
