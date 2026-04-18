import config from "@payload-config";
import "@payloadcms/next/css";
import type { ServerFunctionClient } from "payload";
import {
  handleServerFunctions,
  RootLayout as PayloadDocument,
} from "@payloadcms/next/layouts";
import React from "react";

import { importMap } from "./(payload)/admin/importMap.js";

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export function AdminPayloadRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PayloadDocument config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </PayloadDocument>
  );
}
