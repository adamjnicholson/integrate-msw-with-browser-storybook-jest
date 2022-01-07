import React from "react";

type HTMLElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export function Section({ className, ...props }: HTMLElementProps) {
  return (
    <section
      {...props}
      className={`bg-gray-200 rounded-lg p-4 flex-1 ${className}`}
    />
  );
}

export function Main({ className, ...props }: HTMLElementProps) {
  return (
    <main
      {...props}
      className={`bg-gray-50 p-8 flex flex-col min-h-screen ${className}`}
    />
  );
}
