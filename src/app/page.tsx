import { ResponsiveAppBar } from "@/components/AppBar";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";



export default function Home() {
  return (
      <main>
<ResponsiveAppBar/>
<Container maxWidth="sm">
  <div className="mt-6">
    <Typography variant="h4">Welcome!</Typography>
    <Typography variant="h5">Please, setup your Hue bridge...</Typography>
  </div>
  <div className="text-center mt-6">
  <Button href="hue-bridge-setup" variant="contained" size="large">Bridge Setup</Button>
  </div>
</Container>
      </main>
  );
}
