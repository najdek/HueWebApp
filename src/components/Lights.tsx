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

import { Slider, styled, Switch } from "@mui/material";

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
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#88888855',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));



export function Light(o) {
  return (
    <>
      <div
        className={`min-h-20 w-full flex rounded-t-md ${
          o.isDark ? "text-white" : "text-black"
        }`}
        style={{ backgroundColor: "#" + o.color }}
      >
        <div className="flex justify-between items-center w-full min-h-max px-6">
          <div className="inline-flex justify-start text-2xl font-medium">
            {o.name}
          </div>
          <div className="inline-flex justify-end">
            {/* buttons */}
            <StyledSwitch checked={o.isOn} />
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
          sx={{
            '& input[type="range"]': {
              WebkitAppearance: "slider-horizontal",
            },
          }}
          orientation="horizontal"
          defaultValue={o.isOn ? o.lightBrightness : 0}
          aria-label="Brightness"
          valueLabelDisplay="auto"
        />
      </div>
    </>
  );
}

export function DrawAllLights(o) {
  let data = o.data;
  console.log(data);
  let groups = [];
  for (var obj in data) {
    let key = Object.keys(data).indexOf(obj);
    let thisLight = data[obj];
    console.log(thisLight);

    let hexcolor, isDark;
    if (thisLight.state.colormode == "ct") {
      hexcolor = ctToHex(thisLight.state.ct);
    } else if (thisLight.state.colormode == "hs") {
      hexcolor = hsvToRgb(thisLight.state.hue, thisLight.state.sat);
    } else if (thisLight.state.colormode == "xy") {
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
        color={hexcolor}
        name={thisLight.name}
        isDark={isDark}
        lightBrightness={lightBrightness}
      ></Light>
    );
  }
  return <>{groups}</>;
}
