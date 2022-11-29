import React, { FC, memo, MouseEvent } from "react";

import { Button } from "./DefaultButton.styles";

type DefaultButtonProps = {
  text: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit";
};

const DefaultButton: FC<DefaultButtonProps> = ({
  text,
  onClick,
  disabled,
  type = "button",
}) => {
  return (
    <Button onClick={onClick} disabled={disabled} type={type}>
      {text}
    </Button>
  );
};

export default memo(DefaultButton);
