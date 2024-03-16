"use client";

export function Light(o) {
  return (
    <>
      <div>light {o.id}</div>
    </>
  );
}

export function DrawAllLights(o) {
  let data = o.data;
  console.log(data);
  let groups = [];
  for (var obj in data) {
    let i = Object.keys(data).indexOf(obj);
    groups.push(<Light id={i}></Light>);
  }
  return <>{groups}</>;
}
