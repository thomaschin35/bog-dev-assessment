/**
 * This is the NotesPage that displays the notes of a volunteer using an id.
 * @param rows - the list of volunteers
 */
import { useParams } from "react-router-dom";
import { Card, Typography } from "@mui/material";

interface User {
  name: string;
  avatar: string;
  hero_project: string;
  notes: string;
  email: string;
  phone: string;
  rating: string;
  status: boolean;
  id: string;
}

const NotesPage = ({ rows }: { rows: User[] }) => {
  const { id } = useParams();
  const user = rows.find((user) => user.id === id);

  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div className="NotesPage">
      <Card className="NotesCard">
        <Typography variant="h3">{user.name} Notes</Typography>
        <Typography variant="body1">{user.notes}</Typography>
      </Card>
    </div>
  );
};
export default NotesPage;
