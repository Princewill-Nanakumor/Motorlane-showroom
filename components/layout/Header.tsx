import Link from 'next/link';

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-logo">
          Motorlane
        </Link>
      </div>
    </header>
  );
}
