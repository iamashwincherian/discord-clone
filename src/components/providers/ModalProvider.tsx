"use client";

import useFixMount from "@/hooks/useFixMount";
import CreateServerModal from "../modals/CreateServerModal";

export default function ModalProvider() {
  if (useFixMount()) return;

  return (
    <>
      <CreateServerModal />
    </>
  );
}
