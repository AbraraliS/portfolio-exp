"use client";

import dynamic from "next/dynamic";

/** Loads the 3D stage only in the browser; the keystone mark glows in its place meanwhile. */
const KeeStage = dynamic(() => import("./KeeStage"), {
  ssr: false,
  loading: () => (
    <div className="kee-stage kee-stage-loading" aria-hidden="true" />
  ),
});

export default function KeeStageLazy() {
  return <KeeStage />;
}
