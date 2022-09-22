import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

const getSingle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const result: object | null = await prisma.gitlabCommit.findUnique({
    where: {
      id: id?.toString(),
    },
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
        return getSingle(req, res);
      } catch (err: any) {
        return res.status(500).end(err.message);
      }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
