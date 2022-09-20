import styles from '@/styles/NavbarMega.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/future/image';
import { Disclosure, Menu } from '@headlessui/react';
import { Float } from '@headlessui-float/react';
import { CgClose, CgMenu, CgChevronDown } from 'react-icons/cg';
import { TbBook2, TbBeer } from 'react-icons/tb';
import cn from 'classnames';

import { site } from '@/lib/site';
import ThemeSwitcher from '@/components/ThemeSwitcher';

type TNavItem = {
  className?: string;
  icon?: JSX.Element;
  href: string;
  text: string;
};

const NavItem = (props: TNavItem) => {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <Link href={props.href}>
      <a
        className={cn(
          isActive ? 'text-purple-500' : 'text-gray-800 dark:text-gray-50',
          'flex space-x-2 font-medium py-4 px-4',
          props.className,
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {props.icon}
        <span>{props.text}</span>
      </a>
    </Link>
  );
};

const NavItemMobile = (props: TNavItem) => {
  const router = useRouter();
  const isActive = router.asPath === props.href;

  return (
    <Link href={props.href}>
      <Disclosure.Button
        as="a"
        className={cn(
          isActive
            ? 'bg-purple-50 dark:bg-gray-800 text-purple-500'
            : 'text-gray-800 dark:text-gray-50',
          'flex space-x-2 font-medium py-4 px-4',
          props.className,
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {props.icon}
        <span>{props.text}</span>
      </Disclosure.Button>
    </Link>
  );
};

const NavbarMega = () => {
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
                    width="50"
                    height="39"
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
                    <NavItem href="/" text="Home" />
                    <NavItem href="/about" text="About" />
                    <Menu>
                      {({ open }) => (
                        <Float
                          portal="#mega-menu"
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                          tailwindcssOriginClass
                        >
                          <Menu.Button className="flex items-center font-medium text-gray-800 dark:text-gray-50 py-4 px-4">
                            <span>Navigation</span>
                            <CgChevronDown
                              className={cn(
                                open ? 'rotate-180 transform' : '',
                                'h-5 w-5 ml-2 text-purple-500',
                              )}
                            />
                          </Menu.Button>

                          <Menu.Items className="absolute w-full bg-white dark:bg-gray-900 mt-[1px] border-b border-gray-200 dark:border-gray-700">
                            <div className="mx-auto max-w-7xl px-4">
                              <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-7">
                                  <div className="grid grid-cols-2">
                                    <div className="py-8">
                                      <div className="font-medium text-sm mb-4 text-purple-500">
                                        Mega Menu
                                      </div>
                                    </div>
                                    <div className="py-8">
                                      <div className="font-medium text-sm mb-4 text-purple-500">
                                        Mega Menu
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-5 py-8 px-6 bg-purple-50 dark:bg-gray-800">
                                  <div className="font-medium text-sm mb-4 text-purple-500">
                                    Mega Menu
                                  </div>
                                  <div className="text-gray-800 dark:text-gray-50">
                                    Dynamically administrate low-risk high-yield
                                    web-readiness after turnkey vortals.
                                    Completely generate cost effective paradigms
                                    without B2B services. Holisticly pursue
                                    real-time action items with cost effective
                                    bandwidth. Credibly conceptualize premium
                                    catalysts for change whereas prospective
                                    manufactured products. Uniquely develop
                                    market-driven technology for.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Menu.Items>
                        </Float>
                      )}
                    </Menu>
                  </div>
                </div>
                <ThemeSwitcher />
              </div>
            </div>
          </div>

          <div
            id="mega-menu"
            className={cn(styles.mega, 'hidden sm:block')}
          ></div>

          <Disclosure.Panel className="absolute w-full bg-white dark:bg-gray-900 sm:hidden mt-[1px] border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col">
              <div className="space-y-1 py-6">
                <NavItemMobile href="/" text="Home" />
                <NavItemMobile href="/about" text="About" />
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between font-medium text-gray-800 dark:text-gray-50 py-4 px-4">
                        <span>Navigation</span>
                        <CgChevronDown
                          className={cn(
                            open ? 'rotate-180 transform' : '',
                            'h-6 w-6 text-purple-500',
                          )}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <div className="grid grid-cols-1 gap-5 py-4">
                          <div>
                            <div className="font-medium text-sm px-4 mb-2 text-purple-500">
                              Mega Menu
                            </div>
                            <div>
                              <NavItem
                                icon={
                                  <TbBook2
                                    className="block h-6 w-6 text-purple-500"
                                    aria-hidden="true"
                                  />
                                }
                                href="/"
                                text="Home"
                                className="py-3"
                              />
                              <NavItem
                                icon={
                                  <TbBeer
                                    className="block h-6 w-6 text-purple-500"
                                    aria-hidden="true"
                                  />
                                }
                                href="/doc"
                                text="Documentation"
                                className="py-3"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-sm px-4 mb-2 text-purple-500">
                              Company
                            </div>
                            <div>
                              <NavItem
                                icon={
                                  <TbBook2
                                    className="block h-6 w-6 text-purple-500"
                                    aria-hidden="true"
                                  />
                                }
                                href="/blog"
                                text="Blog"
                                className="py-3"
                              />
                              <NavItem
                                icon={
                                  <TbBeer
                                    className="block h-6 w-6 text-purple-500"
                                    aria-hidden="true"
                                  />
                                }
                                href="/doc"
                                text="Documentation"
                                className="py-3"
                              />
                            </div>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
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

export default NavbarMega;
