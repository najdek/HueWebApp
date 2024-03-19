"use client";
import { ResponsiveAppBar } from "@/components/AppBar";
import { Button, Container, Typography, Snackbar } from "@mui/material";
import { hueLightsGet, hueGroupsGet, fetchHueData } from "./hue";
import { DrawAllLights, DrawAllGroups } from "@/components/Lights";
import { useEffect, useState } from "react";

export default function HueMain() {
  const [hueLightsData, setHueLightsData] = useState([]);
  const [hueGroupsData, setHueGroupsData] = useState([]);
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setInterval(function() {
      fetchHueData(setHueLightsData, setHueGroupsData);
    }, 10000)
    fetchHueData(setHueLightsData, setHueGroupsData);
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
              <DrawAllLights
                data={hueLightsData}
                setHueLightsData={setHueLightsData}
                setHueGroupsData={setHueGroupsData}
              ></DrawAllLights>
            </div>
          </div>
          <div>
            <div className="mt-6">
              <Typography variant="h5">Groups</Typography>
            </div>
            <div>
              <DrawAllGroups 
                setHueLightsData={setHueLightsData}
                setHueGroupsData={setHueGroupsData}
              data={hueGroupsData}></DrawAllGroups>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
