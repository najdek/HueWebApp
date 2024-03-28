"use client";

export function getApiUrl(forceIp?: string) {
  const ip = forceIp || localStorage.getItem("bridgeIp");
  const apiUrlProxied = "/hue-api-proxy/" + ip + "/";
  const apiUrlProxiedSsl = "/hue-api-proxy-ssl/" + ip + "/";
  const apiUrl = "http://" + ip + "/api/";
  const apiUrlSsl = "https://" + ip + "/api/";
  var settingProxy = localStorage.getItem("proxy") == "true";
  var settingSsl = localStorage.getItem("ssl") == "true";

  let out;

  if (settingProxy) {
    if (settingSsl) {
      out = apiUrlProxiedSsl;
    } else {
      out = apiUrlProxied;
    }
  } else {
    if (settingSsl) {
      out = apiUrlSsl;
    } else {
      out = apiUrl;
    }
  }

  return out;
}

export async function hueLightsGet() {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl = getApiUrl() + bridgeAuth + "/lights";

  const res = await fetch(apiUrl, {
    method: "GET",
  });
  const data = await res.json();
  return data;
}

export async function hueGroupsGet() {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl = getApiUrl() + bridgeAuth + "/groups";

  const res = await fetch(apiUrl, {
    method: "GET",
  });
  const data = await res.json();
  return data;
}

export async function hueLightSetBrightness(lightid:number, bri:number, transitionTime:number) {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl =
  getApiUrl() + bridgeAuth + "/lights/" + lightid + "/state";
  const res = await fetch(apiUrl, {
    method: "PUT",
    body: JSON.stringify({ bri: bri, transitiontime: transitionTime / 100 }),
  });
  const data = await res.json();
  return data;
}

export async function hueLightSetState(lightid:number, state:boolean) {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl =
  getApiUrl() + bridgeAuth + "/lights/" + lightid + "/state";
  const res = await fetch(apiUrl, {
    method: "PUT",
    body: JSON.stringify({ on: state }),
  });
  const data = await res.json();
  return data;
}

export async function hueLightSetColor(
  lightid:number,
  state:boolean,
  hue:number,
  sat:number,
  transitionTime:number
) {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl =
  getApiUrl() + bridgeAuth + "/lights/" + lightid + "/state";
  const res = await fetch(apiUrl, {
    method: "PUT",
    body: JSON.stringify({
      on: state,
      hue: hue,
      sat: sat,
      transitiontime: transitionTime / 100,
    }),
  });
  const data = await res.json();
  return data;
}

export async function hueLightSetKelvin(lightid:number, state:boolean, ct:number, transitionTime:number) {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl =
  getApiUrl() + bridgeAuth + "/lights/" + lightid + "/state";
  const res = await fetch(apiUrl, {
    method: "PUT",
    body: JSON.stringify({
      on: state,
      ct: ct,
      transitiontime: transitionTime / 100,
    }),
  });
  const data = await res.json();
  return data;
}

export async function fetchHueData(setHueLightsData:Function, setHueGroupsData:Function) {
  try {
    let newHueLightsData = await hueLightsGet();
    let newHueGroupsData = await hueGroupsGet();

    // calculate average brightness for groups using data from lights fetch
    for (let groupObj in newHueGroupsData) {
      let thisGroup = newHueGroupsData[groupObj];
      let groupBrightness = [];
      for (let lightObj in thisGroup.lights) {
        let thisLight = newHueLightsData[thisGroup.lights[lightObj]];
        if (thisLight.state.on) {
          groupBrightness.push(thisLight.state.bri);
        }
      }
      let averageBrightness = Math.round(
        groupBrightness.reduce((a, b) => a + b, 0) / groupBrightness.length
      );
      newHueGroupsData[groupObj]["averageBrightness"] = averageBrightness;
    }

    setHueLightsData(newHueLightsData);
    setHueGroupsData(newHueGroupsData);
  } catch (error) {
    //error
  }
}
