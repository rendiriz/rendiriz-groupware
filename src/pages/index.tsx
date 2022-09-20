import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

import Layout from '@/layouts/default/Layout';

const Home: NextPage = () => {
  const { data: session } = useSession();

  let accessToken = '';
  const greeting = !session ? 'Hello!' : `Hello ${session?.user?.name}!`;

  // if (session) {
  //   accessToken = session.accessToken as string;
  // }

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 my-12">
        <h1 className="text-5xl">{greeting}</h1>
        <pre>{JSON.stringify(session)}</pre>
      </div>
    </Layout>
  );
};

export default Home;
