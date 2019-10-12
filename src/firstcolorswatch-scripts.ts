import "introcs";

import {
Sprite,
Application, 
Graphics,
DisplayObject,
Rectangle,
Polygon, 
Text
} from "pixi.js";

import { SVG, Group, Circle, Color, Path } from "introcs/graphics";

import { stage1 } from "./colorswatch-script";

function main(): void {
    let app: Application = new Application(600, 600);
    document.body.appendChild(app.view);
    let background: Sprite = Sprite.fromImage("./colorswatch background.png");

    // white, blue, red
}

let p1Choice: string;
let p2Choice: string;

main();