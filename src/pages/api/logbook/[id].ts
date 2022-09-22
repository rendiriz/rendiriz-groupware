import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import moment from 'moment';
import { verify } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

const getSingle = async (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string,
) => {
  const { id } = req.query;
  const payload = verify(token);

  const result = await prisma.logbook.findUnique({
    where: { id: id?.toString() },
    include: {
      commit: {
        include: {
          webhook: {
            include: {
              project: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json({ code: 200, data: result });
};

const updateItem = async (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string,
) => {
  const { id } = req.query;
  const payload = verify(token);

  const body = JSON.parse(req.body);

  const result = await prisma.logbook.update({
    where: { id: id?.toString() },
    data: {
      dateSend: moment(body.dateSend)
        .locale('id')
        .format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'),
      difficultyTask: Number(body.difficultyTask),
      workPlace: body.workPlace,
      organizerTask: body.organizerTask,
      isStatus: 'send',
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
    case 'GET':
      try {
        return getSingle(req, res, token);
      } catch (err: any) {
        return res.status(500).end(err.message);
      }
    case 'PUT':
      try {
        return updateItem(req, res, token);
      } catch (err: any) {
        return res.status(500).end(err.message);
      }
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
