"use client";

import CreateServerModal from "@/components/modals/CreateServerModal";
import InviteModal from "@/components/modals/InviteModal";
import useFixMount from "@/hooks/useFixMount";
import EditServerModal from "../modals/EditServerModal";

export default function ModalProvider() {
  if (useFixMount()) return;

  return (
    <>
      <CreateServerModal />
      <EditServerModal />
      <InviteModal />
    </>
  );
}
