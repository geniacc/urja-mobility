import * as THREE from "three";

// NOTICE: export const mainRoadCurve
export const mainRoadCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 50),
    new THREE.Vector3(0, 0, 20),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -20),
    new THREE.Vector3(15, 0, -40),
    new THREE.Vector3(5, 0, -70),
    new THREE.Vector3(-15, 0, -100),
    new THREE.Vector3(-10, 0, -130),
    new THREE.Vector3(10, 0, -160),
    new THREE.Vector3(0, 0, -190),
    new THREE.Vector3(0, 0, -220),
    new THREE.Vector3(0, 0, -250)
]);