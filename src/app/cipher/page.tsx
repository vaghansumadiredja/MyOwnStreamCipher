"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CipherPage() {
  let router = useRouter();

  useEffect(() => {
    router.push("/cipher/rc4");
  }, []);
  return <></>;
}
