"use client";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu, Moon } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

function Header({ user, profileInfo }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { label: "Home", path: "/", show: true },
    { label: "Sign In", path: "/sign-in", show: !user },
    { label: "Sign Up", path: "/sign-up", show: !user },
    { label: "Activity", path: "/activity", show: user && profileInfo?.data?.role === "candidate" },
    { label: "Jobs", path: "/jobs", show: profileInfo?.data },
    { label: "Member Ship", path: "/membership", show: profileInfo?.data },
    { label: "Account", path: "/account", show: profileInfo?.data },
  ];

  if (!mounted) return null; // Wait for hydration

  return (
    <header className="flex h-16 w-full shrink-0 items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link className="mr-6 hidden lg:flex" href={"/"}>
            <h3>HireSphere</h3>
          </Link>
          <div className="grid gap-2 py-6">
            {menuItems.map(
              (item) =>
                item.show && (
                  <Link
                    key={item.label}
                    href={item.path}
                    onClick={() => sessionStorage.removeItem("filterParams")}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                  >
                    {item.label}
                  </Link>
                )
            )}
            <Moon
              className="cursor-pointer"
              fill={theme === "dark" ? "dark" : "light"}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            />
            <UserButton afterSignOutUrl="/" />
          </div>
        </SheetContent>
      </Sheet>
      <Link className="hidden font-bold text-3xl lg:flex mr-6" href={"/"}>
        <h3>HireSphere</h3>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6 mr-6 items-center">
        {menuItems.map(
          (item) =>
            item.show && (
              <Link
                key={item.label}
                href={item.path}
                onClick={() => sessionStorage.removeItem("filterParams")}
                className="group inline-flex h-9 w-max items-center rounded-md px-4 py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
            )
        )}
        <Moon
          className="cursor-pointer"
          fill={theme === "dark" ? "dark" : "light"}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        <UserButton afterSignOutUrl="/" />
      </nav>
    </header>
  );
}

export default Header;
