import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { unstable_getServerSession } from 'next-auth';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import { useAtom } from 'jotai';

import Layout from '@/layouts/default/Layout';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import BearerToken from '@/components/BearerToken';
import { tokenAtom } from '@/store/global';

const LogbookDetail: NextPage = () => {
  const [token] = useAtom(tokenAtom);
  const router = useRouter();
  const { id } = router.query;

  const { isLoading, error, data } = useQuery(['logbook', id], () =>
    fetch(`/api/logbook/${id}`)
      .then((res) => res.json())
      .then((res) => res.data),
  );

  const mutation = useMutation(
    (payload: any) =>
      fetch(`/api/logbook/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => res.data),
    {
      onSuccess: async () => {
        console.log('redirect /logbook');
        router.push('/logbook');
      },
    },
  );

  const handleUpdate = async (formValues: any) => {
    // Generate Image
    const image = await fetch(
      formValues.evidenceTask + '?timcook=' + Date.now(),
      {
        headers: {
          'Cache-Control': 'no-cache',
        },
      },
    );
    const imageBlob = await image.blob();
    const imageName = `${formValues.projectId}-${formValues.id}.png`;
    const imageFile = new File([imageBlob], imageName, {
      type: 'image/png',
    });

    // Set Form Data
    const values = formValues;
    const formData = new FormData();
    formData.append('projectId', values.projectId);
    formData.append('projectName', values.projectName);
    formData.append('nameTask', values.nameTask);
    formData.append('tupoksiJabatanId', values.tupoksiJabatanId);
    formData.append('isMainTask', values.isMainTask || false);
    formData.append(
      'dateTask',
      moment(values.dateSend).locale('id').format('YYYY-MM-DD'),
    );
    formData.append('difficultyTask', String(values.difficultyTask));
    formData.append('isDocumentLink', values.isDocumentLink || true);
    formData.append('documentTask', values.documentTask);
    formData.append('workPlace', values.workPlace);
    formData.append('organizerTask', values.organizerTask);
    formData.append('evidenceTask', imageFile);

    // Send Logbook to Groupware
    const groupware = await fetch(`/api/groupware`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const groupwareResult = await groupware.json();

    if (groupwareResult.status === 'error') {
      console.error('Error');
      return;
    }

    // Update Logbook
    mutation.mutate(formValues);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-5 mt-12 mb-24">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl mb-4">Edit & Send Logbook</h1>

          <BearerToken />

          {error && <div>Failed to load</div>}
          {isLoading && <div>Loading...</div>}

          {data && (
            <div>
              <Formik
                initialValues={{
                  id: data.id,
                  projectId: data.commit.webhook.project.groupwareProjectId,
                  projectName: data.commit.webhook.project.name,
                  nameTask: data.commit.title,
                  tupoksiJabatanId: data.tupoksiJabatanId,
                  isMainTask: false,
                  dateTask: moment(data.commit.timestamp)
                    .locale('id')
                    .format('YYYY-MM-DD'),
                  dateSend: data.dateSend
                    ? moment(data.dateSend).locale('id').format('YYYY-MM-DD')
                    : moment(data.commit.timestamp)
                        .locale('id')
                        .format('YYYY-MM-DD'),
                  difficultyTask: Number(data.difficultyTask) || 1,
                  evidenceTask: data.evidenceTask,
                  isDocumentLink: true,
                  documentTask: data.commit.url,
                  workPlace: data.workPlace,
                  organizerTask: data.organizerTask,
                }}
                validationSchema={Yup.object({
                  projectId: Yup.string().required('Required'),
                  projectName: Yup.string().required('Required'),
                  nameTask: Yup.string().required('Required'),
                  tupoksiJabatanId: Yup.string().required('Required'),
                  dateTask: Yup.date().required('Required'),
                  dateSend: Yup.date().required('Required'),
                  difficultyTask: Yup.number().required('Required'),
                  evidenceTask: Yup.string().required('Required'),
                  documentTask: Yup.string().required('Required'),
                  workPlace: Yup.string().required('Required'),
                  organizerTask: Yup.string().required('Required'),
                })}
                onSubmit={(values) => {
                  handleUpdate(values);
                }}
              >
                <Form>
                  <div className="mb-4">
                    <label
                      htmlFor="projectId"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Groupware Project ID
                    </label>
                    <Field name="projectId">
                      {({ field, meta }: any) => (
                        <>
                          <input
                            type="text"
                            id="projectId"
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Groupware Project ID"
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="projectName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Project Name
                    </label>
                    <Field name="projectName">
                      {({ field, meta }: any) => (
                        <>
                          <input
                            type="text"
                            id="projectName"
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Project Name"
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="nameTask"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Name Task
                    </label>
                    <Field name="nameTask">
                      {({ field, meta }: any) => (
                        <>
                          <input
                            type="text"
                            id="nameTask"
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Name Task"
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="tupoksiJabatanId"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Tupoksi Jabatan ID
                    </label>
                    <Field name="tupoksiJabatanId">
                      {({ field, meta }: any) => (
                        <>
                          <input
                            type="text"
                            id="tupoksiJabatanId"
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tupoksi Jabatan ID"
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="dateTask"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Date Task
                    </label>
                    <Field name="dateTask">
                      {({ field, meta }: any) => (
                        <>
                          <input
                            type="text"
                            id="dateTask"
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Date Task"
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="dateSend"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Date Send
                    </label>
                    <Field name="dateSend">
                      {({ field, meta }: any) => (
                        <>
                          <input
                            type="text"
                            id="dateSend"
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Date Send"
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="difficultyTask"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Difficulty Task
                    </label>
                    <Field name="difficultyTask">
                      {({ field, meta }: any) => (
                        <>
                          <input
                            type="text"
                            id="difficultyTask"
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Difficulty Task"
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="evidenceTask"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Evidence Task
                    </label>
                    <Field name="evidenceTask">
                      {({ field, meta }: any) => (
                        <>
                          {data.evidenceTask && (
                            <div className="border rounded-md mb-2">
                              <Image
                                alt={data.id}
                                src={data.evidenceTask}
                                width={1280}
                                height={720}
                              />
                            </div>
                          )}
                          <input
                            type="text"
                            id="evidenceTask"
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Evidence Task"
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="documentTask"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Document Task
                    </label>
                    <Field name="documentTask">
                      {({ field, meta }: any) => (
                        <>
                          <input
                            type="text"
                            id="documentTask"
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Document Task"
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="workPlace"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Work Place
                    </label>
                    <Field name="workPlace">
                      {({ field, meta }: any) => (
                        <>
                          <input
                            type="text"
                            id="workPlace"
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Work Place"
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="organizerTask"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Organizer Task
                    </label>
                    <Field name="organizerTask">
                      {({ field, meta }: any) => (
                        <>
                          <input
                            type="text"
                            id="organizerTask"
                            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Organizer Task"
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="text-red-500 text-sm mt-1">
                              {meta.error}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className={cn(
                        'px-5 py-2.5',
                        'text-white bg-blue-700 dark:bg-blue-600',
                        'enabled:hover:bg-blue-800 enabled:dark:hover:bg-blue-700',
                        'flex items-center justify-center rounded-lg transition-all',
                        'font-medium text-sm',
                        'flex-shrink-0',
                      )}
                      disabled={mutation.isLoading}
                    >
                      {mutation.isLoading ? 'Loading...' : 'Edit & Send'}
                    </button>
                  </div>
                </Form>
              </Formik>
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

export default LogbookDetail;
