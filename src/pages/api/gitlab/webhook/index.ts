import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

const tokenGitlab = process.env.GITLAB_TOKEN;

const createItem = async (req: NextApiRequest, res: NextApiResponse) => {
  const tokenXGitlab = req.headers['x-gitlab-token'];
  if (tokenGitlab !== tokenXGitlab) {
    return res.status(401).json({ code: 401, message: 'Invalid token' });
  }

  const username = req.body.user_username;
  if (username !== 'rendiriz') {
    return res.status(401).json({ code: 400, message: 'Invalid user' });
  }

  // Modify Body
  const bodyCommit = req.body.commits.map((commit: any) => {
    const bodyAdded = commit.added.map((added: string) => {
      return { filename: added };
    });

    const bodyModified = commit.modified.map((modified: string) => {
      return { filename: modified };
    });

    const bodyRemoved = commit.removed.map((removed: string) => {
      return { filename: removed };
    });

    const bodyLogbook = {
      isStatus: 'draft',
    };

    const dataCommit = {
      id: commit.id,
      message: commit.message,
      title: commit.title,
      timestamp: commit.timestamp,
      url: commit.url,
      author_id: req.body.user_id,
      author_name: commit.author.name,
      author_email: commit.author.email,
      logbook: {
        create: bodyLogbook,
      },
    };

    if (bodyAdded.length > 0) {
      Object.assign(dataCommit, {
        added: {
          create: bodyAdded,
        },
      });
    }

    if (bodyModified.length > 0) {
      Object.assign(dataCommit, {
        modified: {
          createMany: bodyModified,
        },
      });
    }

    if (bodyRemoved.length > 0) {
      Object.assign(dataCommit, {
        removed: {
          createMany: bodyRemoved,
        },
      });
    }

    return dataCommit;
  });

  const body = {
    object_kind: req.body.object_kind,
    event_name: req.body.event_name,
    before: req.body.before,
    after: req.body.after,
    ref: req.body.ref,
    checkout_sha: req.body.checkout_sha,
    message: req.body.message,
    user_provider: 'gitlab',
    user_id: req.body.user_id.toString(),
    user_name: req.body.user_name,
    user_username: req.body.user_username,
    user_email: req.body.user_email,
    user_avatar: req.body.user_avatar,
    total_commits_count: req.body.total_commits_count,
    projectId: req.body.project.id,
    commit: {
      create: bodyCommit,
    },
  };

  try {
    const result = await prisma.gitlabWebhook.create({
      data: body,
      include: {
        commit: {
          include: {
            logbook: true,
            added: true,
            modified: true,
            removed: true,
          },
        },
      },
    });

    res.status(200).json({ code: 200, data: result });
  } catch (e) {
    throw e;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        return createItem(req, res);
      } catch (err: any) {
        return res.status(500).json({ code: err.code, message: err.message });
      }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
