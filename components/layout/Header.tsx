import Link from 'next/link';

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-logo">
          <span className="site-logo__mark" aria-hidden="true" />
          <span className="site-logo__text">Motorlane</span>
        </Link>
        <nav className="site-nav" aria-label="Main">
          <Link href="/" className="site-nav__link">
            Showroom
          </Link>
        </nav>
      </div>
    </header>
  );
}
