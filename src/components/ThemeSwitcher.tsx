import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { CgMoon, CgSun } from 'react-icons/cg';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <button
      aria-label="Toggle Theme Switcher"
      type="button"
      className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-800 dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && (
        <>
          {resolvedTheme === 'dark' ? (
            <CgSun className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <CgMoon className="block h-6 w-6" aria-hidden="true" />
          )}
        </>
      )}
    </button>
  );
};

export default ThemeSwitcher;
