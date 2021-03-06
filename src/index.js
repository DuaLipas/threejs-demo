// A THREE.js Environment is made up of 5 things:
// Renderer (what the user sees)
// Scene (the data)
// Camera(the perspective)
// Meshes (objects in the 3d world)
// Lights

const {AxesHelper} = require("three");
const THREE = require("three");
const orbit = require("three-orbitcontrols");

function createRenderer() {
  let renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("#16161d");
  let output = document.querySelector("#output");
  output.appendChild(renderer.domElement);
  return renderer;
}

function createScene() {
  return new THREE.Scene();
}

function createCamera() {
  let camera = new THREE.PerspectiveCamera(
    45, // Fov
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near Value
    1000 // Far Value
  );
  camera.position.set(-30, 40, 30);
  camera.lookAt(0, 0, 0);
  return camera;
}

function getRandomColor() {
  let colors = [
    "dodgerblue",
    "tomato",
    "limegreen",
    "rebeccapurple",
    "gold",
    "lavender",
    "lightcoral",
    "papayawhip",
  ];
  let randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function createCube() {
  // Geometry - actual shape/skeleton of the object
  let geometry = new THREE.BoxGeometry(4, 4, 4);
  // Material - The colour/how it interacts with light
  let material = new THREE.MeshLambertMaterial({
    // color: "tomato",
    // color: "#66B933",
    color: getRandomColor(),
  });
  // Create a mesh by combining the geometry and the material
  let mesh = new THREE.Mesh(geometry, material);
  // Return it so it will be added to the scene
  return mesh;
}

function createSphere() {
  // Geometry
  let geo = new THREE.SphereGeometry(4, 30, 30);
  // Material
  let mat = new THREE.MeshLambertMaterial({
    // color: "dodgerblue",
    color: getRandomColor(),
  });
  // Mesh
  let mesh = new THREE.Mesh(geo, mat);
  // Return the mesh
  return mesh;
}

function createAxesHelper() {
  let axesHelper = new THREE.AxesHelper(40);
  return axesHelper;
}

function createLight() {
  let light = new THREE.PointLight("white", 1.2);
  return light;
}

function createLightHelper(light) {
  let helper = new THREE.PointLightHelper(light);
  return helper;
}

let renderer = createRenderer();
let scene = createScene();
let camera = createCamera();
let axesHelper = createAxesHelper();
let cube = createCube();
let sphere = createSphere();
let light = createLight();
let lightHelper = createLightHelper(light);

let control = new orbit(camera, renderer.domElement);

light.position.x = 10;
light.position.y = 10;
light.position.Z = 10;
sphere.position.x = 20;

let cubes = [];
let cubeCount = 500;

for (let i = 1; i <= cubeCount; i += 1) {
  let c = createCube();
  c.position.x = Math.random() * 400 - 200; // range of x from -200 to 200
  c.position.y = Math.random() * 400 - 200; // range of x from -200 to 200
  c.position.z = Math.random() * 400 - 200; // range of x from -200 to 200
  cubes.push(c);
}

console.log(cubes.length);

// scene.add(axesHelper);
scene.add(cube, sphere, light, lightHelper, ...cubes);

renderer.render(scene, camera);

function animate() {
  light.position.x += 0.1;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;
  cubes.forEach(function (c) {
    c.rotation.x -= 0.01;
    c.rotation.y -= 0.01;
    c.rotation.z -= 0.01;
  });
  // cube.position.y -= 0.1;
  // cube.position.z -= 0.1;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
