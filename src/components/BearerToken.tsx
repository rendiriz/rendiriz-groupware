import { useRef } from 'react';
import { useAtom } from 'jotai';
import cn from 'classnames';

import { tokenAtom } from '@/store/global';

const BearerToken = () => {
  const [token, setToken] = useAtom(tokenAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToken = () => {
    const value = inputRef.current?.value || '';
    setToken(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        className="col-span-6 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Groupware Bearer Token"
        defaultValue={token}
        ref={inputRef}
      />
      <button
        type="button"
        className={cn(
          'px-5 py-2.5',
          'text-white bg-blue-700 dark:bg-blue-600',
          'enabled:hover:bg-blue-800 enabled:dark:hover:bg-blue-700',
          'flex items-center justify-center rounded-lg transition-all',
          'font-medium text-sm',
          'flex-shrink-0',
        )}
        onClick={(e) => {
          e.preventDefault();
          handleToken();
        }}
      >
        Set Bearer Token
      </button>
    </div>
  );
};

export default BearerToken;
