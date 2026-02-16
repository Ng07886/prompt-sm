import { Card, CardContent, CardHeader, Avatar, Box } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

type Props = {
  friendName: string;
  onClick?: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export default function FriendCard({
  friendName,
  onClick,
  children,
  footer,
  className,
}: Props) {
  return (
    <Card
      className={className}
      onClick={onClick}
      sx={{ cursor: onClick ? "pointer" : "default" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label={friendName}>
            {friendName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={friendName}
      />
      <CardContent>
        <Box sx={{ mb: footer ? 1 : 0 }}>{children}</Box>
        {footer && <Box sx={{ mt: 1 }}>{footer}</Box>}
      </CardContent>
    </Card>
  );
}
