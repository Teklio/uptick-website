import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** black = for light backgrounds, white = for dark backgrounds. */
export default function Logo({
  variant = "black",
  className,
  imgClassName,
}: {
  variant?: "black" | "white";
  className?: string;
  imgClassName?: string;
}) {
  return (
    <Link href="/" aria-label="Uptick Tech — home" className={cn("inline-block", className)}>
      <Image
        src={variant === "black" ? "/logo-black.png" : "/logo-white.png"}
        alt="Uptick Tech"
        width={720}
        height={227}
        priority
        className={cn("h-9 w-auto md:h-10", imgClassName)}
      />
    </Link>
  );
}
