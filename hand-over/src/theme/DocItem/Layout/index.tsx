import React, { type ReactNode } from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import OriginalDocItemLayout from "@theme-original/DocItem/Layout";
import DocItemContent from "@theme/DocItem/Content";
import SlideDeck from "@gridd/docusaurus-slides-plugin/components/SlideDeck";
import type { Props } from "@theme/DocItem/Layout";

type DocFrontMatter = {
  page_type?: string;
  [key: string]: unknown;
};

export default function DocItemLayout({ children }: Props): ReactNode {
  const { frontMatter } = useDoc();
  const fm = frontMatter as DocFrontMatter;

  if (fm.page_type === "slides") {
    return (
      <div style={{ width: "100%" }}>
        <SlideDeck>
          <DocItemContent>{children}</DocItemContent>
        </SlideDeck>
      </div>
    );
  }

  return <OriginalDocItemLayout>{children}</OriginalDocItemLayout>;
}
