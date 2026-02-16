import "./style/FriendAnswerCard.style.css";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";

type Props = {
  friendName: string;
  answer: string;
};

export default function FriendAnswerCard({ friendName, answer }: Props) {
  return (
    <Card className="friend-answer-card">
      <CardHeader
        className="friend-answer-card-header"
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label={friendName}>
            {friendName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={friendName}
      />
      <CardContent>
        <Typography className="friend-card-content" variant="body1">
          {answer}
        </Typography>
      </CardContent>
    </Card>
  );
}
