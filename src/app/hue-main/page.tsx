"use client";

import { ResponsiveAppBar } from "@/components/AppBar";
import { Button, Container, Typography } from "@mui/material";

export default function HueMain() {
    return (
        <main>
        <ResponsiveAppBar/>
        <Container maxWidth="sm">
          <div className="mt-6">
            <Typography variant="h5">Connected to: {localStorage.getItem("bridgeIp")}</Typography>
          </div>
        </Container>
        </main>
    )
}