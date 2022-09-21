import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

import Layout from '@/layouts/default/Layout';

const Home: NextPage = () => {
  const { data: session } = useSession();

  const greeting = !session ? 'Hello!' : `Hello ${session?.user?.name}!`;

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 my-12">
        <h1 className="text-5xl">{greeting}</h1>
      </div>
    </Layout>
  );
};

export default Home;
