"use client";
import {
  Button,
  Container,
  Typography,
  Snackbar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  AppBar,
  Toolbar,
  Fab,
} from "@mui/material";
import { hueLightsGet, hueGroupsGet, fetchHueData } from "./hue";
import { DrawAllLights, DrawAllGroups } from "@/components/Lights";
import { useEffect, useState } from "react";
import {
  BatchPrediction,
  Close,
  Lightbulb,
  Settings,
} from "@mui/icons-material";
import React from "react";
import { BottomNav } from "@/components/BottomNav";
import { HueSettings } from "@/components/HueSettings";

export default function HueMain() {
  const [hueLightsData, setHueLightsData] = useState([]);
  const [hueGroupsData, setHueGroupsData] = useState([]);
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(0);

  useEffect(() => {
    setInterval(function () {
      fetchHueData(setHueLightsData, setHueGroupsData);
    }, 10000);
    fetchHueData(setHueLightsData, setHueGroupsData);
  }, []);

  function toggleSettingsFab() {
    if (bottomNavValue !== 2) {
      setBottomNavValue(2);
    } else {
      setBottomNavValue(0);
    }
  }

  return (
    <main>
      <Container className="pb-20 lg:pb-0" maxWidth="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 overflow-hidden">
          <div
            className={`${bottomNavValue == 0 ? "block" : "hidden lg:block"} ${
              bottomNavValue >= 2 ? "lg:hidden" : ""
            }`}
          >
            <div className="mt-4 lg:mt-8 mb-4">
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
            className={`${bottomNavValue == 1 ? "block" : "hidden lg:block"} ${
              bottomNavValue >= 2 ? "lg:hidden" : ""
            }`}
          >
            <div className="mt-4 lg:mt-8 mb-4">
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

          <div className={`${bottomNavValue == 2 ? "block" : "hidden"}`}>
            <div className="mt-4 lg:mt-8 mb-4">
              <Typography variant="h5">Settings</Typography>
            </div>
            <div>
              <HueSettings />
            </div>
          </div>
        </div>
      </Container>
      <BottomNav
        bottomNavValue={bottomNavValue}
        setBottomNavValue={setBottomNavValue}
      />

      <div className={`fixed top-4 right-4 hidden lg:block`}>
        <div className={`${bottomNavValue !== 2 ? "block" : "hidden"}`}>
          <Fab size="small" onClick={toggleSettingsFab}>
            <Settings />
          </Fab>
        </div>
        <div className={`${bottomNavValue == 2 ? "block" : "hidden"}`}>
          <Fab size="small" onClick={toggleSettingsFab}>
            <Close />
          </Fab>
        </div>
      </div>
    </main>
  );
}
