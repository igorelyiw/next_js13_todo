import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/dojo-logo.png";
import LogoutButton from "./LogoutButton";

const Navbar = ({ user }) => {
  return (
    <nav>
      <Image
        src={Logo}
        alt="logo"
        width={70}
        quality={100}
        placeholder="blur"
      />
      <h2>Anta help_desk</h2>

      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className="mr-auto">
        Tickets
      </Link>
      {user && <span>Hello, {user}</span>}
      <LogoutButton />
    </nav>
  );
};

export default Navbar;
