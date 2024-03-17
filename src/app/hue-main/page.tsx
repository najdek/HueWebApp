"use client";
import { ResponsiveAppBar } from "@/components/AppBar";
import { Button, Container, Typography } from "@mui/material";
import { hueLightsGet, hueGroupsGet } from "./hue";
import { DrawAllLights, DrawAllGroups } from "@/components/Lights";
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
    };
    fetchData();
  }, []);

  const [hueGroupsData, setHueGroupsData] = useState([]);
  useEffect(() => {
    var fetchData = async () => {
      try {
        const result = await hueGroupsGet();
        console.log(result);
        setHueGroupsData(result);
      } catch (error) {
        //error
      }
    };
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
