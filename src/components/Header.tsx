import config from '@/app/config';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Header() {
  return (
    <div className="header flex items-center justify-center pt-4 sm:justify-between">
      <h2 className={cn('m-0 text-3xl font-extrabold tracking-wider')}>
        <Link href="/" className="decoration-transparent capitalize">
          {config.author}
        </Link>
      </h2>
    </div>
  );
}
