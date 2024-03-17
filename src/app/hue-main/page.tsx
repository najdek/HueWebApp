"use client";
import { ResponsiveAppBar } from "@/components/AppBar";
import { Button, Container, Typography } from "@mui/material";
import { hueLightsGet, hueGroupsGet } from "./hue";
import { DrawAllLights, DrawAllGroups } from "@/components/Lights";
import { useEffect, useState } from "react";

export default function HueMain() {
  const [hueLightsData, setHueLightsData] = useState([]);
  const [hueGroupsData, setHueGroupsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let newHueLightsData = await hueLightsGet();
        let newHueGroupsData = await hueGroupsGet();
        setHueLightsData(newHueLightsData);
        setHueGroupsData(newHueGroupsData);

        setTimeout(fetchData, 2000);
      } catch (error) {
        //error
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mt-6">
              <Typography variant="h5">Lights</Typography>
            </div>
            <div>
              <DrawAllLights data={hueLightsData}></DrawAllLights>
            </div>
          </div>
          <div>
            <div className="mt-6">
              <Typography variant="h5">Groups</Typography>
            </div>
            <div>
              <DrawAllGroups data={hueGroupsData}></DrawAllGroups>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
