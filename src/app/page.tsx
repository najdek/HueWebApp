"use client";
import { Button, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  useEffect(() => {
    const bridgeIp = typeof window !== "undefined" ? localStorage.getItem("bridgeIp") : "";
    if (bridgeIp !== "") {
      push("/hue-main");
    }
  }, []);

  return (
    <main>
      <Container maxWidth="sm">
        <div className="mt-6">
          <Typography variant="h4">Welcome!</Typography>
          <Typography variant="h5">Please, setup your Hue bridge...</Typography>
        </div>
        <div className="text-center mt-6">
          <Button href="hue-bridge-setup" variant="contained" size="large">
            Bridge Setup
          </Button>
        </div>
      </Container>
    </main>
  );
}
