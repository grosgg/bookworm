'use client';

import {
  HomeIcon,
  FolderIcon,
  PlusIcon,
  BookOpenIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

export default function NavLinks() {
  const t = useTranslations('ui.navLinks');
  const pathname = usePathname();

  const links = [
    { name: t('home'), href: '/home', icon: HomeIcon },
    { name: t('addBook'), href: '/books/add', icon: PlusIcon },
    { name: t('bookshelves'), href: '/bookshelves', icon: FolderIcon },
    { name: t('allBooks'), href: '/books', icon: BookOpenIcon },
    { name: t('settings'), href: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-yellow-100 hover:text-yellow-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-yellow-100 text-yellow-600': pathname === link.href,
              },
            )}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
