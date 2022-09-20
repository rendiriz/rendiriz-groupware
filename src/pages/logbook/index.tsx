import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

import Layout from '@/layouts/default/Layout';
import Custom404 from '@/pages/404';

const Logbook: NextPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <Custom404 />;
  }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 my-12">
        <h1 className="text-5xl">Logbook</h1>
      </div>
    </Layout>
  );
};

export default Logbook;
