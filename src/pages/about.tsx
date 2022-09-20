import type { NextPage } from 'next';

import Layout from '@/layouts/default/Layout';

const About: NextPage = () => {
  const meta = {
    title: 'About',
    description: 'Company Profile About',
  };

  return (
    <Layout {...meta}>
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-blue-500">About</h1>
      </div>
    </Layout>
  );
};

export default About;
