import { Engine } from "./engine";

var canvas: HTMLCanvasElement;
var device: Engine.Device;
var mesh: Engine.Mesh;
var meshes: Engine.Mesh[] = [];
var camera: Engine.Camera;

//document.addEventListener("DOMContentLoaded", init, false);

function init(): void {
    canvas = <HTMLCanvasElement> document.getElementById("frontBuffer");
    mesh = new Engine.Mesh("Cube", 8);
    meshes.push(mesh);
    camera = new Engine.Camera();
    device = new Engine.Device(canvas);

    mesh.Vertices[1] = new BABYLON.Vector3(1, 1, 1);
    mesh.Vertices[2] = new BABYLON.Vector3(-1, -1, 1);
    mesh.Vertices[3] = new BABYLON.Vector3(-1, -1, -1);
    mesh.Vertices[4] = new BABYLON.Vector3(-1, 1, -1);
    mesh.Vertices[5] = new BABYLON.Vector3(1, 1, -1);
    mesh.Vertices[6] = new BABYLON.Vector3(1, -1, 1);
    mesh.Vertices[7] = new BABYLON.Vector3(1, -1, -1);

    camera.Position = new BABYLON.Vector3(0, 0, 10);
    camera.Target = new BABYLON.Vector3(0, 0, 0);

    requestAnimationFrame(drawingLoop);
};

function drawingLoop(): void {
    device.clear();

    mesh.Rotation.x += 0.01;
    mesh.Rotation.y += 0.01;

    // render to backbuffer
    device.render(camera, meshes);

    // flush backbuffer to frontbuffer
    device.present();

    // .. ad infinitum
    requestAnimationFrame(drawingLoop);
};

init();
