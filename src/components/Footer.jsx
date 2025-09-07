import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
const links = [
  { href: "https://www.github.com/mannythecodeworm9", icon: <FaGithub /> },
  { href: "https://www.linkedin.com/in/mannythecodeworm9", icon: <FaLinkedin /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-violet-300 py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:flex-row">
        <p className="text-center text-sm">
          &copy; Mann's Arcane 2024 . All content rights reserved.
        </p>
        <p className="text-center text-sm">
          &copy; Nova 2024 . All Design rights reserved.
        </p>
      </div>
      <div className="flex justify-center gap-4 ">
        {links.map((link) => (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            key={link.href}
            className="text-black transition-colors duration-500 ease-in-out hover:text-violet-50"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
