import type { NextPage } from 'next';

const Custom404: NextPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2">404</h1>
      <h2 className="font-medium leading-tight text-4xl mt-0 mb-2">
        Page Not Found
      </h2>
    </div>
  );
};

export default Custom404;
