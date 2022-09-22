import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { unstable_getServerSession } from 'next-auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import cn from 'classnames';

import Layout from '@/layouts/default/Layout';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import BearerToken from '@/components/BearerToken';

const Logbook: NextPage = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(['logbook'], () =>
    fetch(`/api/logbook`)
      .then((res) => res.json())
      .then((res) => res.data),
  );

  const mutation = useMutation(
    (payload: any) =>
      fetch(`/api/evidence/${payload.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['logbook']);
      },
    },
  );

  const handleEvidence = async (data: any) => {
    if (data.evidenceTask) {
      window.open(data.evidenceTask, '_blank');
    } else {
      mutation.mutate(data);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-5 my-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl mb-4">Logbook</h1>

          <BearerToken />

          {error && <div>Failed to load</div>}
          {isLoading && <div>Loading...</div>}

          {data && (
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left border dark:border-gray-700">
                <thead className="text-xs  uppercase bg-gray-50 dark:bg-gray-700">
                  <tr className="border-b dark:border-gray-700">
                    <td className="py-3 px-2.5">Date</td>
                    <td className="py-3 px-2.5">Project</td>
                    <td className="py-3 px-2.5">Task</td>
                    <td className="py-3 px-2.5">Status</td>
                    <td className="py-3 px-2.5">Send Date</td>
                    <td className="py-3 px-2.5">Evidence</td>
                    <td className="py-3 px-2.5 text-center">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row: any) => (
                    <tr
                      key={row.id}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                      <td className="py-3 px-2.5">
                        {moment(row.commit.timestamp)
                          .locale('id')
                          .format('YYYY-MM-DD')}
                      </td>
                      <td className="py-3 px-2.5">
                        {row.commit.webhook.project.name}
                      </td>
                      <td className="py-3 px-2.5">{row.commit.title}</td>
                      <td className="py-3 px-2.5">
                        {row.isStatus === 'draft' ? (
                          <span className="text-orange-500">Draft</span>
                        ) : (
                          <span className="text-green-500">Terkirim</span>
                        )}
                      </td>
                      <td className="py-3 px-2.5">
                        {row.dateSend
                          ? moment(row.dateSend)
                              .locale('id')
                              .format('YYYY-MM-DD')
                          : '-'}
                      </td>
                      <td className="py-3 px-2.5 flex gap-2">
                        {row.evidenceTask ? (
                          <HiCheckCircle
                            className="h-5 w-5 text-green-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <HiXCircle
                            className="h-5 w-5 text-red-400"
                            aria-hidden="true"
                          />
                        )}
                        <button
                          type="button"
                          className={cn(
                            'px-0 py-0',
                            'text-blue-600 dark:text-blue-500',
                            'flex items-center justify-center rounded-lg transition-all',
                            'font-medium text-sm',
                            'enabled:hover:underline',
                          )}
                          onClick={async () => {
                            await handleEvidence(row);
                          }}
                        >
                          {row.evidenceTask ? (
                            'Evidence'
                          ) : (
                            <>
                              {mutation.isLoading
                                ? 'Generating...'
                                : 'Generate'}
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-2.5">
                        {row.evidenceTask && (
                          <Link href={`/logbook/${encodeURIComponent(row.id)}`}>
                            <a
                              className={cn(
                                'px-0 py-0',
                                'text-blue-600 dark:text-blue-500',
                                'flex items-center justify-center rounded-lg transition-all',
                                'font-medium text-sm',
                                'enabled:hover:underline',
                              )}
                            >
                              Send
                            </a>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  );

  if (!session) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
};

export default Logbook;
