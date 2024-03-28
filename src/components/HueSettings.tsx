import { defaultTransitionTime } from "@/app/hue-main/hue";
import { Flare, RestartAlt } from "@mui/icons-material";
import {
  Checkbox,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";

export function HueSettingsConnectNewBridge() {
  return (
    <ListItemButton
    href="/hue-bridge-setup"
        >
              <ListItemIcon>
          <RestartAlt />
        </ListItemIcon>

        <ListItemText primary="Connect to another Hue Bridge" />
    </ListItemButton>
  );
}

export function HueSettingsProxyToggle() {
  const [proxyOn, setProxyOn] = useState(Boolean);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProxyOn(localStorage.getItem("proxy") == "true");
    }
  }, []);

  const handleHueSettingsProxyToggle = (proxyOn: boolean) => {
    if (typeof window !== "undefined") {
      if (proxyOn == true) {
        localStorage.setItem("proxy", "false");
        setProxyOn(false);
      } else {
        localStorage.setItem("proxy", "true");
        setProxyOn(true);
      }
    }
  };

  return (
    <ListItemButton
      onClick={() => handleHueSettingsProxyToggle(proxyOn)}
    >
      <ListItemIcon>
        <Checkbox edge="start" checked={proxyOn} tabIndex={-1} disableRipple />
      </ListItemIcon>
      <ListItemText primary={`Use internal proxy for bridge connection`} />
    </ListItemButton>
  );
}

export function HueSettingsSslToggle() {
  const [sslOn, setSslOn] = useState(Boolean);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSslOn(localStorage.getItem("ssl") == "true");
    }
  }, []);

  const handleHueSettingsSslToggle = (sslOn: boolean) => {
    if (typeof window !== "undefined") {
      if (sslOn == true) {
        localStorage.setItem("ssl", "false");
        setSslOn(false);
      } else {
        localStorage.setItem("ssl", "true");
        setSslOn(true);
      }
    }
  };

  return (
    <ListItemButton
      onClick={() => handleHueSettingsSslToggle(sslOn)}
    >
      <ListItemIcon>
        <Checkbox edge="start" checked={sslOn} tabIndex={-1} disableRipple />
      </ListItemIcon>
      <ListItemText primary={`Use SSL for bridge connection`} />
    </ListItemButton>
  );
}

export function HueSettingsTransitionTime() {
  const [transitionTime, setTransitionTime] = useState(defaultTransitionTime);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let savedTransitionTime = parseInt(localStorage.getItem("transitionTime") || defaultTransitionTime.toString());
      setTransitionTime(savedTransitionTime);
    }
  }, []);

  const handleHueSettingsTransitionTimeChange = (event: { target: { value: any; }; }) => {
    if (typeof window !== "undefined") {
        let newTransitionTime = event.target.value;
        localStorage.setItem("transitionTime", newTransitionTime.toString());
        setTransitionTime(newTransitionTime);
    }
  };

  return (
    <ListItemButton>
      <ListItemIcon>
        <Flare />
      </ListItemIcon>
      <ListItemText primary={`Change light transition time:`} />

      <Select
        value={transitionTime}
        onChange={handleHueSettingsTransitionTimeChange}
        size="small"
      >
        <MenuItem value={0}>Instant</MenuItem>
        <MenuItem value={100}>0.1s</MenuItem>
        <MenuItem value={200}>0.2s</MenuItem>
        <MenuItem value={300}>0.3s</MenuItem>
        <MenuItem value={400}>0.4s</MenuItem>
        <MenuItem value={500}>0.5s</MenuItem>
        <MenuItem value={600}>0.6s</MenuItem>
        <MenuItem value={700}>0.7s</MenuItem>
        <MenuItem value={800}>0.8s</MenuItem>
        <MenuItem value={900}>0.9s</MenuItem>
        <MenuItem value={1000}>1.0s</MenuItem>
      </Select>
    </ListItemButton>
  );
}

export function HueSettings() {
  return (
    <List>
      <HueSettingsConnectNewBridge />
      <HueSettingsProxyToggle />
      <HueSettingsSslToggle />
      <HueSettingsTransitionTime />
    </List>
  );
}
