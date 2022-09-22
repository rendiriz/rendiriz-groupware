import type { NextPage } from 'next';
import { GetStaticProps, GetStaticPaths } from 'next';

import { TbChevronRight, TbFileDescription } from 'react-icons/tb';
import moment from 'moment';

const api = process.env.NEXT_PUBLIC_SITE_URL;

type TGitlabCommit = {
  commits?: any;
};

const GitlabCommit: NextPage = (props: TGitlabCommit) => {
  const { commits: data } = props;

  const changes =
    data.added.length + data.modified.length + data.removed.length;

  return (
    <div className="mx-auto max-w-7xl px-4 mt-10 mb-20">
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <div>{data.webhook.project.namespace.name}</div>
        <TbChevronRight />
        <div>{data.webhook.project.name}</div>
        <TbChevronRight />
        <div>Commits</div>
        <TbChevronRight />
        <div className="font-semibold">{data.id}</div>
      </div>
      <hr className="my-6 dark:border-gray-700" />
      <div className="flex">
        <div className="flex-1">
          <span className="font-bold">
            Commit{' '}
            <span className="font-mono font-semibold text-sm">{data.id}</span>
          </span>
          <span> authored</span>
          <span> {moment(data.timestamp).fromNow()}</span>
          <span> by </span>
          <span className="font-bold">{data.author_name}</span>
        </div>
      </div>
      <hr className="my-6 dark:border-gray-700" />
      <div className="flex flex-col gap-6">
        <h1 className="font-semibold text-3xl">{data.title}</h1>
        <div>
          Changes{'  '}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            {changes}
          </span>
          <hr className="mt-4 mb-2 dark:border-gray-700" />
        </div>
        <div className="flex flex-col gap-4">
          {data.added.map((row: any) => (
            <div
              key={row.id}
              className="rounded-md p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            >
              <div className="flex">
                <TbFileDescription className="w-6 h-6 mr-2" /> {row.filename}
              </div>
            </div>
          ))}
          {data.modified.map((row: any) => (
            <div
              key={row.id}
              className="rounded-md p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            >
              <div className="flex">
                <TbFileDescription className="w-6 h-6 mr-2" /> {row.filename}
              </div>
            </div>
          ))}
          {data.removed.map((row: any) => (
            <div
              key={row.id}
              className="rounded-md p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            >
              <div className="flex">
                <TbFileDescription className="w-6 h-6 mr-2" /> {row.filename}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const res = await fetch(`${api}/api/gitlab/commit/${params?.id}`);
  const data = await res.json();
  const commits = await data.data;

  return {
    props: {
      commits,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${api}/api/gitlab/commit`);
  const data = await res.json();
  const commits = await data.data;

  return {
    paths: commits.map((row: any) => ({ params: { id: row.id } })),
    fallback: 'blocking',
  };
};

export default GitlabCommit;
