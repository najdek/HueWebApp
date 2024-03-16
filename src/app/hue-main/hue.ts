"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export async function hueLightsGet() {
  const ip = localStorage.getItem("bridgeIp");
  const bridgeAuth = localStorage.getItem("bridgeAuth");
  const apiUrl = "/hue-api-proxy/" + ip + "/" + bridgeAuth + "/lights/";

  const res = await fetch(apiUrl, {
    method: "GET",
  });
  const data = await res.json();
  // data is array of all lights
  console.log(data);
  return data;
}
