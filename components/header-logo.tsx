import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="hidden lg:flex items-center">
        <Image src="/logo.svg" width={28} height={28} alt="Logo" />
        <p className="font-bold text-white text-2xl ml-2.5">Finance</p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
