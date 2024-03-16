"use client";
import { ResponsiveAppBar } from "@/components/AppBar";
import { Button, Container, Typography } from "@mui/material";
import { hueLightsGet } from "./hue";
import { DrawAllLights } from "@/components/Lights";
import { useEffect, useState } from "react";

export default function HueMain() {
    const [hueLightsData, setHueLightsData] = useState([]);
    useEffect(() => {
        var fetchData = async () => {
            try {
                const result = await hueLightsGet();
                console.log(result);
                setHueLightsData(result);
            } catch (error) {
                //error
            }
        }
        fetchData();
    }, [])

    return (
        <main>
        <ResponsiveAppBar/>
        <Container maxWidth="sm">
          <div className="mt-6">
            <Typography variant="h5">Connected to: {localStorage.getItem("bridgeIp")}</Typography>
          </div>
          <div>
            <DrawAllLights data={hueLightsData}></DrawAllLights>
          </div>
        </Container>
        </main>
    )
}

