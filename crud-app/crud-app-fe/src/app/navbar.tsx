 import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/create-profile">Create Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
