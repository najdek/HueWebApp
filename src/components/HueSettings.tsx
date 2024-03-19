import { Button, Container } from "@mui/material";

export function HueSettings() {

  return (
    <Container className="pb-20 lg:pb-0" maxWidth="lg">
      <p className="text-xl">Connect to another Hue Bridge</p>
      <Button variant="contained" href="/hue-bridge-setup">Hue Bridge Setup</Button>
    </Container>
  );
}
