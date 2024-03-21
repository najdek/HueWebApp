import { RestartAlt } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";

export function HueSettingsConnectNewBridge() {
  return (
    <ListItem disablePadding>
      <ListItemButton href="/hue-bridge-setup">
        <ListItemIcon>
          <RestartAlt />
        </ListItemIcon>
        <ListItemText primary="Connect to another Hue Bridge" />
      </ListItemButton>
    </ListItem>
  );
}

export function HueSettingsProxyToggle() {
  const [proxyOn, setProxyOn] = useState(
    localStorage.getItem("proxy") == "true"
  );

    const handleHueSettingsProxyToggle = (proxyOn: boolean) => {
        if (proxyOn == true) {
          localStorage.setItem("proxy", "false");
          setProxyOn(false);
        } else {
          localStorage.setItem("proxy", "true");
          setProxyOn(true);
        }
    }

  return (
    <ListItemButton
      role={undefined}
      onClick={() => handleHueSettingsProxyToggle(proxyOn)}
      dense
    >
      <ListItemIcon>
        <Checkbox edge="start" checked={proxyOn} tabIndex={-1} disableRipple />
      </ListItemIcon>
      <ListItemText primary={`Use internal proxy for bridge connection`} />
    </ListItemButton>
  );
}


export function HueSettingsSslToggle() {
  const [sslOn, setSslOn] = useState(localStorage.getItem("ssl") == "true");

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
  }

  return (
    <ListItemButton
      role={undefined}
      onClick={() => handleHueSettingsSslToggle(sslOn)}
      dense
    >
      <ListItemIcon>
        <Checkbox edge="start" checked={sslOn} tabIndex={-1} disableRipple />
      </ListItemIcon>
      <ListItemText primary={`Use SSL for bridge connection`} />
    </ListItemButton>
  );
}

export function HueSettings() {
  return (
    <List>
      <HueSettingsConnectNewBridge />
      <HueSettingsProxyToggle />
      <HueSettingsSslToggle />
    </List>
  );
}
