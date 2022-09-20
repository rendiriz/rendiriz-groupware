import { forwardRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/future/image';
import { Disclosure, Menu } from '@headlessui/react';
import { Float } from '@headlessui-float/react';
import { CgClose, CgMenu, CgChevronDown } from 'react-icons/cg';
import cn from 'classnames';

import { site } from '@/lib/site';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Navigation',
    href: '#',
    sub: [
      { name: 'Default', href: '/navigation/default' },
      { name: 'Dropdown', href: '/navigation/dropdown' },
      { name: 'Mega Menu', href: '/navigation/mega-menu' },
      // { name: 'Mega Menu Mega Menu Mega Menu', href: '/navigation/mega-menu' },
    ],
  },
];

type TNavItem = {
  className?: string;
  href: string;
  text: string;
  sub?: any[];
};

type TNavItemLink = {
  className?: string;
  children: string;
  href: string;
};

const NavItemLink = forwardRef<HTMLAnchorElement, TNavItemLink>(
  function NavItemLink(props, ref): any {
    let { href, children, ...rest } = props;

    return (
      <Link href={href}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    );
  },
);

const NavItem = (props: TNavItem) => {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <>
      {!props.sub ? (
        <Link href={props.href}>
          <a
            className={cn(
              isActive ? 'text-purple-500' : 'text-gray-800 dark:text-gray-50',
              'block font-medium py-4 px-4',
              props.className,
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {props.text}
          </a>
        </Link>
      ) : (
        <Menu>
          {({ open }) => (
            <Float
              className="flex items-center"
              placement="bottom-end"
              flip
              arrow
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              tailwindcssOriginClass
            >
              <Menu.Button className="flex items-center font-medium text-gray-800 dark:text-gray-50 py-4 px-4">
                <span>{props.text}</span>
                <CgChevronDown
                  className={cn(
                    open ? 'rotate-180 transform' : '',
                    'h-5 w-5 ml-2 text-purple-500',
                  )}
                />
              </Menu.Button>

              <Menu.Items className="min-w-[12rem] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none">
                <Float.Arrow className="absolute bg-white dark:bg-gray-900 w-8 h-8 rotate-45 border border-gray-200 dark:border-gray-700" />
                <div className="relative bg-white dark:bg-gray-900 rounded-md overflow-hidden p-2">
                  {props.sub?.map((subItem) => (
                    <Menu.Item key={subItem.name}>
                      {({ active }) => (
                        <NavItemLink
                          href={subItem.href}
                          className={cn(
                            active && 'bg-purple-50 dark:bg-gray-800',
                            'block rounded-md p-2',
                          )}
                        >
                          {subItem.name}
                        </NavItemLink>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Float>
          )}
        </Menu>
      )}
    </>
  );
};

const NavItemMobile = (props: TNavItem) => {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <>
      {!props.sub ? (
        <Link href={props.href}>
          <Disclosure.Button
            as="a"
            className={cn(
              isActive
                ? 'font-semibold bg-purple-50 dark:bg-gray-800 text-purple-500'
                : 'font-medium text-gray-800 dark:text-gray-50',
              'block py-4 px-4',
              props.className,
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {props.text}
          </Disclosure.Button>
        </Link>
      ) : (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between font-medium text-gray-800 dark:text-gray-50 py-4 px-4">
                <span>{props.text}</span>
                <CgChevronDown
                  className={cn(
                    open ? 'rotate-180 transform' : '',
                    'h-6 w-6 text-purple-500',
                  )}
                />
              </Disclosure.Button>
              <Disclosure.Panel>
                <div className="space-y-1">
                  {props.sub?.map((subItem) => (
                    <NavItemMobile
                      className="px-8"
                      key={subItem.name}
                      href={subItem.href}
                      text={subItem.name}
                      sub={subItem.sub}
                    />
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}
    </>
  );
};

const Navbar = () => {
  return (
    <Disclosure
      as="nav"
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4">
            <div className="relative flex flex-wrap items-center justify-between py-2">
              <Link href={'/'}>
                <a className="text-xl text-gray-800 no-underline whitespace-nowrap mr-4 py-2">
                  <Image
                    alt={site.name}
                    src="/logoipsum.svg"
                    width="49"
                    height="48"
                  />
                </a>
              </Link>
              <div className="flex space-x-2 sm:space-x-4 md:space-x-6 items-center">
                <div className="sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <CgClose className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <CgMenu className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavItem
                        key={item.name}
                        href={item.href}
                        text={item.name}
                        sub={item.sub}
                      />
                    ))}
                  </div>
                </div>
                <ThemeSwitcher />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="absolute w-full bg-white dark:bg-gray-900 sm:hidden mt-[1px] border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col">
              <div className="space-y-1 py-6">
                {navigation.map((item) => (
                  <NavItemMobile
                    key={item.name}
                    href={item.href}
                    text={item.name}
                    sub={item.sub}
                  />
                ))}
              </div>
              <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
                Footer
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
