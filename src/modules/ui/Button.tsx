import React from "react";

import { Link, LinkProps } from "react-router-dom";

const BUTTON_STYLES =
  "inline-flex items-center bg-purple-500 text-white py-2 px-4 rounded-md transition-colors hover:bg-purple-700";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export function Button({ className = "", ...props }: ButtonProps) {
  return <button {...props} className={`${BUTTON_STYLES} ${className}`} />;
}

export type LinkButtonProps = LinkProps &
  React.RefAttributes<HTMLAnchorElement>;

export function LinkButton({ className = "", ...props }: LinkButtonProps) {
  return <Link {...props} className={`${BUTTON_STYLES} ${className}`} />;
}
