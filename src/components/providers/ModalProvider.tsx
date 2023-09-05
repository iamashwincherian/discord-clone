"use client";

import CreateServerModal from "@/components/modals/CreateServerModal";
import InviteModal from "@/components/modals/InviteModal";
import useFixMount from "@/hooks/useFixMount";

export default function ModalProvider() {
  if (useFixMount()) return;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
    </>
  );
}
