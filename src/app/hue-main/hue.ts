"use client";

export async function hueLightsGet() {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl = "/hue-api-proxy/" + ip + "/" + bridgeAuth + "/lights";

  const res = await fetch(apiUrl, {
    method: "GET",
  });
  const data = await res.json();
  // data is array of all lights
  console.log(data);
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
  // data is array of all groups
  console.log(data);
  return data;
}

export async function hueLightSetBrightness(lightid, bri, transitionTime) {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl =
    "/hue-api-proxy/" + ip + "/" + bridgeAuth + "/lights/" + lightid + "/state";
  const res = await fetch(apiUrl, {
    method: "PUT",
    body: JSON.stringify({ bri: bri, transitionTime: transitionTime }),
  });
  const data = await res.json();
  console.log(data);
  return data;
}


export async function hueLightSetState(lightid, state, transitionTime) {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl =
    "/hue-api-proxy/" + ip + "/" + bridgeAuth + "/lights/" + lightid + "/state";
  const res = await fetch(apiUrl, {
    method: "PUT",
    body: JSON.stringify({ on: state, transitionTime: transitionTime }),
  });
  const data = await res.json();
  console.log(data);
  return data;
}