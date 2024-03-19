"use client";

export async function hueLightsGet() {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl = "/hue-api-proxy/" + ip + "/" + bridgeAuth + "/lights";

  const res = await fetch(apiUrl, {
    method: "GET",
  });
  const data = await res.json();
  return data;
}

export async function hueGroupsGet() {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl = "/hue-api-proxy/" + ip + "/" + bridgeAuth + "/groups";

  const res = await fetch(apiUrl, {
    method: "GET",
  });
  const data = await res.json();
  return data;
}

export async function hueLightSetBrightness(lightid, bri, transitionTime) {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl =
    "/hue-api-proxy/" + ip + "/" + bridgeAuth + "/lights/" + lightid + "/state";
  const res = await fetch(apiUrl, {
    method: "PUT",
    body: JSON.stringify({ bri: bri, transitiontime: transitionTime / 100 }),
  });
  const data = await res.json();
  return data;
}

export async function hueLightSetState(lightid, state, transitionTime) {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl =
    "/hue-api-proxy/" + ip + "/" + bridgeAuth + "/lights/" + lightid + "/state";
  const res = await fetch(apiUrl, {
    method: "PUT",
    body: JSON.stringify({ on: state, transitiontime: transitionTime / 100 }),
  });
  const data = await res.json();
  return data;
}

export async function hueLightSetColor(
  lightid,
  state,
  hue,
  sat,
  transitionTime
) {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl =
    "/hue-api-proxy/" + ip + "/" + bridgeAuth + "/lights/" + lightid + "/state";
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

export async function hueLightSetKelvin(lightid, state, ct, transitionTime) {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl =
    "/hue-api-proxy/" + ip + "/" + bridgeAuth + "/lights/" + lightid + "/state";
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

export async function fetchHueData(setHueLightsData, setHueGroupsData) {
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
