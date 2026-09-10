"use client";
import Image from "next/image";
import { ReactNode } from "react";

import mainLogo from "@/assets/logo/logo3.avif";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const isLogin = pathName === "/login";

  return (
    <div className="min-h-screen flex">
      {/* ─── Left panel — mainLogo full-bleed cover ─── */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col overflow-hidden">
        {/* Full-bleed logo image */}
        <Image
          src={mainLogo}
          alt="Juri Link visual"
          fill
          priority
          className="object-cover"
        />

        {/* Dark gradient overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2d3e]/80 via-[#1a4a62]/40 to-transparent" />

        {/* Animated floating blobs on top of image */}
        <div className="absolute top-[-80px] left-[-60px] w-80 h-80 rounded-full bg-white/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-60px] right-[-40px] w-96 h-96 rounded-full bg-[#ffc107]/10 blur-3xl animate-pulse [animation-delay:1.5s]" />

        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col h-full p-12">
          {/* App name badge top-left */}
          <Link href="/" className="flex items-center gap-2 mb-auto">
            <div className="backdrop-blur-sm bg-white/20 ring-1 ring-white/30 rounded-xl px-3 py-1.5">
              <span className="text-white font-bold text-lg tracking-wide">
                Juri Link
              </span>
            </div>
          </Link>

          {/* Tagline pinned to bottom */}
          <div className="mt-auto text-center space-y-3">
            <h2 className="text-white text-2xl font-bold leading-snug drop-shadow-lg">
              {isLogin
                ? "Welcome back to your legal hub"
                : "Start your legal journey today"}
            </h2>
            <p className="text-white/70 text-sm max-w-xs mx-auto drop-shadow">
              Streamline case management, track deadlines, and collaborate with
              your team — all in one place.
            </p>

          </div>
        </div>
      </div>

      {/* ─── Right form panel ─── */}
      <div className="flex-1 flex flex-col justify-center items-center bg-[#f5f7fa] px-6 sm:px-12 lg:px-16 xl:px-20 py-12">
        {children}
      </div>
    </div>
  );
}