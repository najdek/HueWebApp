"use client";
import {
  Button,
  Container,
  Typography,
  Snackbar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import { hueLightsGet, hueGroupsGet, fetchHueData } from "./hue";
import { DrawAllLights, DrawAllGroups } from "@/components/Lights";
import { useEffect, useState } from "react";
import { BatchPrediction, Lightbulb } from "@mui/icons-material";
import React from "react";

export default function HueMain() {
  const [hueLightsData, setHueLightsData] = useState([]);
  const [hueGroupsData, setHueGroupsData] = useState([]);
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const slideContainerRef = React.createRef();

  useEffect(() => {
    setInterval(function () {
      fetchHueData(setHueLightsData, setHueGroupsData);
    }, 10000);
    fetchHueData(setHueLightsData, setHueGroupsData);
  }, []);

  return (
    <main>
      <Container className="pb-20 lg:pb-0" maxWidth="lg">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 overflow-hidden"
          ref={slideContainerRef}
        >
          <div
            className={`${bottomNavValue == 0 ? "block" : "hidden"} lg:block`}
          >
            <div className="mt-6 mb-2">
              <Typography variant="h5">Groups</Typography>
            </div>
            <div>
              <DrawAllGroups
                setHueLightsData={setHueLightsData}
                setHueGroupsData={setHueGroupsData}
                data={hueGroupsData}
              ></DrawAllGroups>
            </div>
          </div>

          <div
            className={`${bottomNavValue == 1 ? "block" : "hidden"} lg:block`}
          >
            <div className="mt-6 mb-2">
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
        </div>
      </Container>
      <Paper className="fixed bottom-0 left-0 w-full lg:hidden">
        <BottomNavigation
          showLabels
          value={bottomNavValue}
          onChange={(event, newValue) => {
            setBottomNavValue(newValue);
          }}
        >
          <BottomNavigationAction label="Groups" icon={<BatchPrediction />} />
          <BottomNavigationAction label="Lights" icon={<Lightbulb />} />
        </BottomNavigation>
      </Paper>
    </main>
  );
}
