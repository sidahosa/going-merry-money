"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-primary-red p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and App Name */}
        <Link href="/" className="flex items-center">
          <Image src="/images/jolly-roger.png" alt="Logo" width={48} height={48} />
          <h1 className="text-3xl font-title ml-2 text-primary-yellow">Beri Tracker</h1>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            {[
              { name: "Home", path: "/" },
              { name: "Expenses", path: "/expenses" },
              { name: "Goals", path: "/goals" },
              { name: "About", path: "/about" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`nav-link ${pathname === link.path ? "nav-link-active" : ""}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
