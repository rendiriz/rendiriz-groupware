import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { verify } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;
const api = process.env.GITLAB_API_URL;

const getSingle = async (
  req: NextApiRequest,
  res: NextApiResponse,
  token: string,
) => {
  const { id } = req.query;
  const payload = verify(token);

  const project = await fetch(`${api}/projects/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'PRIVATE-TOKEN': payload.private_token,
    },
  });
  const data = await project.json();

  // Modify Body
  const body = {
    id: data.id,
    namespaceId: data.namespace.id,
    description: data.description,
    name: data.name,
    name_with_namespace: data.name_with_namespace,
    path: data.path,
    path_with_namespace: data.path_with_namespace,
    created_at: data.created_at,
    default_branch: data.default_branch,
    ssh_url_to_repo: data.ssh_url_to_repo,
    http_url_to_repo: data.http_url_to_repo,
    web_url: data.web_url,
    readme_url: data.readme_url,
    avatar_url: data.avatar_url,
    forks_count: data.forks_count,
    star_count: data.star_count,
    last_activity_at: data.last_activity_at,
  };

  const result = await prisma.gitlabProject.upsert({
    where: { id: data.id },
    update: body,
    create: body,
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
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
