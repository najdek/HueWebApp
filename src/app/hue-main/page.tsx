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

        // calculate average brightness for groups using data from lights fetch
        for (let groupObj in newHueGroupsData) {
          let thisGroup = newHueGroupsData[groupObj];
          let groupBrightness = [];
          for (let lightObj in thisGroup.lights) {
            let thisLight = newHueLightsData[thisGroup.lights[lightObj]];
              groupBrightness.push(thisLight.state.bri);
          }
          let averageBrightness = Math.round((groupBrightness.reduce((a, b) => a + b, 0) / groupBrightness.length));
          newHueGroupsData[groupObj]["averageBrightness"] = averageBrightness;
        }

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
