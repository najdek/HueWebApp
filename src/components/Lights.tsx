"use client";

import { xyToRgb } from "@/app/colors";
import { rgbToHex } from "@/app/colors";
import { hsvToRgb } from "@/app/colors";
import { hexToHs } from "@/app/colors";
import { kelvinToCt } from "@/app/colors";
import { ctToPickerKelvin } from "@/app/colors";
import { kelvinToRgb } from "@/app/colors";
import { ctToHex } from "@/app/colors";
import { lightOrDark } from "@/app/colors";

import { IconButton, Slider, styled, Switch, SwitchProps } from "@mui/material";

import { hueLightSetBrightness, hueLightSetState } from "@/app/hue-main/hue";
import { ReactEventHandler, SyntheticEvent, useState } from "react";

import { Snackbar } from "@mui/material";
import switchBaseClasses from "@mui/material/internal/switchBaseClasses";
import { ColorPicker, KelvinPicker } from "./IroPicker";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ContrastIcon from "@mui/icons-material/Contrast";

import { fetchHueData } from "@/app/hue-main/hue";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";

const CustomSlider = styled(Slider)({
  color: "#00000000",
  height: 0,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 32,
    width: 32,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
    transition: "left 0.5s",
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 16,
    background: "unset",
    padding: 0,
    width: 36,
    height: 36,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#444",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const StyledSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#88888855",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export function Light(o:any) {
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [kelvinPickerOpen, setKelvinPickerOpen] = useState(false);
  const setHueLightsData = o.setHueLightsData;
  const setHueGroupsData = o.setHueGroupsData;

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleBrightnessChange = (vent: Event | SyntheticEvent<Element, Event>, value: number | any) => {
    let newValue = value.isArray() ? value[0] : value;
    let newBri = Math.round((newValue * 255) / 100);
    hueLightSetBrightness(o.id, newBri, 200);
    setSnackbarOpen(false);
    setSnackbarText(
      "Changing brightness of Light [" + o.name + "] to " + value + "%"
    );
    setSnackbarOpen(true);
    fetchHueData(setHueLightsData, setHueGroupsData);
  };

  const handleSwitch = (event: any) => {
    let newState = event.target.checked;
    setSwitchChecked(newState);
    hueLightSetState(o.id, newState, 200);
    setSnackbarOpen(false);
    setSnackbarText(
      "Toggling Light [" + o.name + "]. New state: " + (newState ? "ON" : "OFF")
    );
    setSnackbarOpen(true);
    fetchHueData(setHueLightsData, setHueGroupsData);
  };

  return (
    <>
      <div
        className={`min-h-20 w-full flex rounded-t-md ${
          o.isDark ? "text-white" : "text-black"
        }`}
        style={{
          backgroundColor: "#" + o.color,
          transition: "background-color 500ms linear",
        }}
      >
        <div className="flex justify-between items-center w-full min-h-max px-6">
          <div className="inline-flex justify-start text-2xl font-medium">
            {o.name}
          </div>
          <div className="inline-flex justify-end items-center space-x-4">
            {/* buttons */}
            <div onClick={() => setKelvinPickerOpen(true)}>
            <IconButton
              aria-label="set color temperature"
            >
              <ContrastIcon className={o.isDark ? "text-white" : "text-black"} />
            </IconButton>
            </div>
            <div onClick={() => setColorPickerOpen(true)}>
            <IconButton aria-label="set color">
              <ColorLensIcon className={o.isDark ? "text-white" : "text-black"} />
            </IconButton>
            </div>
            <StyledSwitch checked={o.isOn} onChange={handleSwitch} />
          </div>
        </div>
      </div>
      {/* brightness slider */}
      <div
        className={`w-full flex rounded-b-md bg-gradient-to-r from-gray-800 mb-4 px-4 ${
          o.isDark ? "text-white" : "text-black"
        }`}
        style={{ backgroundColor: "#" + o.color }}
      >
        <CustomSlider
          key={`bri-slider-light-${o.id}`}
          sx={{
            '& input[type="range"]': {
              WebkitAppearance: "slider-horizontal",
            },
          }}
          orientation="horizontal"
          value={o.lightBrightness}
          step={1}
          min={0}
          max={100}
          aria-label="Brightness"
          valueLabelDisplay="auto"
          onChangeCommitted={handleBrightnessChange}
        />
      </div>
      <Snackbar
        autoHideDuration={800}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarText}
      />
      <ColorPicker
        id={o.id}
        setColorPickerOpen={setColorPickerOpen}
        colorPickerOpen={colorPickerOpen}
        colormode={o.colormode}
        color={o.color}
        ct={o.ct}
        mode="color"
        setHueLightsData={o.setHueLightsData}
        setHueGroupsData={o.setHueGroupsData}
      />

      <KelvinPicker
        id={o.id}
        kelvinPickerOpen={kelvinPickerOpen}
        setKelvinPickerOpen={setKelvinPickerOpen}
        colormode={o.colormode}
        color={o.color}
        ct={o.ct}
        mode="kelvin"
        setHueLightsData={o.setHueLightsData}
        setHueGroupsData={o.setHueGroupsData}
      />
    </>
  );
}

export function Group(o:any) {
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(o.isOn);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [kelvinPickerOpen, setKelvinPickerOpen] = useState(false);
  const setHueLightsData = o.setHueLightsData;
  const setHueGroupsData = o.setHueGroupsData;

  const handleSnackbarClose = function () {
    setSnackbarOpen(false);
  };

  const handleBrightnessChange = (vent: Event | SyntheticEvent<Element, Event>, value: number | any) => {
    let newBri = Math.round((value * 255) / 100);
    for (let i = 0; i < o.ids.length; i++) {
      hueLightSetBrightness(o.ids[i], newBri, 200);
    }
    setSnackbarOpen(false);
    setSnackbarText(
      "Changing brightness of Group [" + o.name + "] to " + value + "%"
    );
    setSnackbarOpen(true);
    fetchHueData(setHueLightsData, setHueGroupsData);
  };

  const handleSwitch = (event:any) => {
    let newState = event.target.checked;
    setSwitchChecked(newState);
    for (let i = 0; i < o.ids.length; i++) {
      hueLightSetState(o.ids[i], newState, 200);
    }
    setSnackbarOpen(false);
    setSnackbarText(
      "Toggling Group [" + o.name + "]. New state: " + (newState ? "ON" : "OFF")
    );
    setSnackbarOpen(true);
    fetchHueData(setHueLightsData, setHueGroupsData);
  };

  return (
    <>
      <div
        className={`min-h-20 w-full flex rounded-t-md ${
          o.isDark ? "text-white" : "text-black"
        }`}
        style={{
          backgroundColor: "#" + o.color,
          transition: "background-color 500ms linear",
        }}
      >
        <div className="flex justify-between items-center w-full min-h-max px-6">
          <div className="inline-flex justify-start text-2xl font-medium">
            {o.name}
          </div>
          <div className="inline-flex justify-end items-center space-x-4">
            {/* buttons */}
            <div onClick={() => setKelvinPickerOpen(true)}>
            <IconButton aria-label="set color temperature">
              <ContrastIcon
                className={o.isDark ? "text-white" : "text-black"}
              />
            </IconButton>
            </div>
            <div onClick={() => setColorPickerOpen(true)}>
            <IconButton aria-label="set color">
              <ColorLensIcon
                className={o.isDark ? "text-white" : "text-black"}
              />
            </IconButton>
            </div>

            <StyledSwitch checked={o.isOn} onChange={handleSwitch} />
          </div>
        </div>
      </div>
      {/* brightness slider */}
      <div
        className={`w-full flex rounded-b-md bg-gradient-to-r from-gray-800 mb-4 px-4 ${
          o.isDark ? "text-white" : "text-black"
        }`}
        style={{ backgroundColor: "#" + o.color }}
      >
        <CustomSlider
          key={`bri-slider-group-${o.id}`}
          sx={{
            '& input[type="range"]': {
              WebkitAppearance: "slider-horizontal",
            },
          }}
          orientation="horizontal"
          value={o.lightBrightness}
          step={1}
          min={0}
          max={100}
          aria-label="Brightness"
          valueLabelDisplay="auto"
          onChangeCommitted={handleBrightnessChange}
        />
      </div>
      <Snackbar
        autoHideDuration={800}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarText}
      />
      <ColorPicker
        ids={o.ids}
        setColorPickerOpen={setColorPickerOpen}
        colorPickerOpen={colorPickerOpen}
        colormode={o.colormode}
        color={o.color}
        ct={o.ct}
        mode="color"
        setHueLightsData={o.setHueLightsData}
        setHueGroupsData={o.setHueGroupsData}
      />

      <KelvinPicker
        ids={o.ids}
        kelvinPickerOpen={kelvinPickerOpen}
        setKelvinPickerOpen={setKelvinPickerOpen}
        colormode={o.colormode}
        color={o.color}
        ct={o.ct}
        mode="kelvin"
        setHueLightsData={o.setHueLightsData}
        setHueGroupsData={o.setHueGroupsData}
      />
    </>
  );
}

export function DrawAllLights(o:any) {
  let data = o.data;
  let groups = [];
  for (var obj in data) {
    let key = Object.keys(data).indexOf(obj);
    let thisLight = data[obj];
    console.log(thisLight);

    let hexcolor, isDark;
    let ct = 0;
    let colormode = thisLight.state.colormode;
    if (colormode == "ct") {
      ct = thisLight.state.ct;
      hexcolor = ctToHex(ct);
    } else if (colormode == "hs") {
      hexcolor = hsvToRgb(thisLight.state.hue, thisLight.state.sat);
    } else if (colormode == "xy") {
      hexcolor = xyToRgb(thisLight.state.xy[0], thisLight.state.xy[1]);
    }

    if (thisLight.state.on == false) {
      hexcolor = "999999";
    }

    if (lightOrDark(hexcolor) == "light") {
      isDark = false;
    } else {
      isDark = true;
    }

    let lightBrightness = Math.round((thisLight.state.bri / 255) * 100);

    groups.push(
      <Light
        id={obj}
        isOn={thisLight.state.on}
        colormode={colormode}
        color={hexcolor}
        ct={ct}
        name={thisLight.name}
        isDark={isDark}
        lightBrightness={lightBrightness}
        setHueLightsData={o.setHueLightsData}
        setHueGroupsData={o.setHueGroupsData}
      ></Light>
    );
  }
  return <>{groups}</>;
}

export function DrawAllGroups(o:any) {
  let data = o.data;
  console.log(data);
  let groups = [];
  for (var obj in data) {
    let key = Object.keys(data).indexOf(obj);
    let thisGroup = data[obj];
    console.log(thisGroup);

    let groupType = thisGroup.type;

    if (groupType !== "Room" && groupType !== "Zone") {
      continue;
    }

    let hexcolor, isDark;
    let ct = 0;
    let colormode = thisGroup.action.colormode;
    if (colormode == "ct") {
      ct = thisGroup.action.ct;
      hexcolor = ctToHex(ct);
    } else if (colormode == "hs") {
      hexcolor = hsvToRgb(thisGroup.action.hue, thisGroup.action.sat);
    } else if (colormode == "xy") {
      hexcolor = xyToRgb(thisGroup.action.xy[0], thisGroup.action.xy[1]);
    }

    if (thisGroup.action.on == false) {
      hexcolor = "999999";
    }

    if (lightOrDark(hexcolor) == "light") {
      isDark = false;
    } else {
      isDark = true;
    }

    let lightBrightness = Math.round((thisGroup.averageBrightness / 255) * 100);

    console.log("colormode: group " + obj + " " + colormode);
    groups.push(
      <Group
        id={obj}
        ids={thisGroup.lights}
        isOn={thisGroup.action.on}
        colormode={colormode}
        color={hexcolor}
        ct={ct}
        name={thisGroup.name}
        isDark={isDark}
        lightBrightness={lightBrightness}
        setHueLightsData={o.setHueLightsData}
        setHueGroupsData={o.setHueGroupsData}
      ></Group>
    );
  }
  return <>{groups}</>;
}
