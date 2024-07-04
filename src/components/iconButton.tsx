import { ButtonHTMLAttributes, ReactNode } from "react";
import { KnownIconType } from "@charcoal-ui/icons";
import { CircularProgress } from '@mui/material';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconName: keyof KnownIconType;
  isProcessing: boolean;
  label?: string;
  customIcon?: ReactNode;
};

export const IconButton = ({
  iconName,
  isProcessing,
  label,
  customIcon,
  ...rest
}: Props) => {
  return (
    <button
      {...rest}
      className={`bg-primary hover:bg-primary-hover active:bg-primary-press disabled:bg-primary-disabled text-white rounded-16 text-sm p-8 text-center inline-flex items-center mr-2
        ${rest.className}
      `}
    >
      {isProcessing ? (
        <CircularProgress size={24} color="inherit" />
      ) : customIcon ? (
        customIcon
      ) : (
        <pixiv-icon name={iconName} scale="1"></pixiv-icon>
      )}
      {label && <div className="mx-4 font-bold">{label}</div>}
    </button>
  );
};

IconButton.defaultProps = {
  iconName: "24/Close", // ここでデフォルトのアイコン名を指定
};
