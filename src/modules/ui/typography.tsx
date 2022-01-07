import React from "react";

type HeadingProps = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & Partial<Omit<HTMLHeadingElement, "children">>;

const HEADING_STYLES_MAP: Partial<Record<HeadingProps["as"], string>> = {
  h1: "font-bold text-4xl text-gray-900 pb-8",
  h2: "font-bold text-2xl text-gray-900 pb-4",
};

export function Heading({
  as,
  ...props
}: React.PropsWithChildren<HeadingProps>) {
  return React.createElement(as, {
    ...props,
    className: `${HEADING_STYLES_MAP[as]} ${props.className}`,
  });
}
