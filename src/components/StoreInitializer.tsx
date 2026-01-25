"use client";

import { useRef } from "react";
import { useConfigStore } from "@/stores/config-store";

export default function StoreInitializer({
  data,
}: {
  data: { isOpen: boolean; zapNumber: string; pixKey: string };
}) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useConfigStore.getState().updateConfig(data);
    initialized.current = true;
  }

  return null;
}
