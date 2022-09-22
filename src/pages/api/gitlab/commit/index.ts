import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

const getList = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await prisma.gitlabCommit.findMany({
    include: {
      webhook: {
        include: {
          project: {
            include: {
              namespace: true,
            },
          },
        },
      },
      added: true,
      modified: true,
      removed: true,
    },
  });

  res.status(200).json({ code: 200, data: result });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        return getList(req, res);
      } catch (err: any) {
        return res.status(500).end(err.message);
      }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
