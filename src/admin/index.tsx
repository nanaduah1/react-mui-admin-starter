import { Typography } from "@mui/material";
import { CenterContent } from "../components/centerContent";
import AdminLayout from "./layout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <CenterContent>
        <Typography>Welcome</Typography>
      </CenterContent>
    </AdminLayout>
  );
}
