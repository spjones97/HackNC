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

import { isColliding, isColliding2, isColliding3 } from "./racecar-script";

class Player {
    car: Sprite;
} 

export function stage2(): void {
    // ..
    let app: Application = new Application(1024, 614);
    document.body.appendChild(app.view);

    let background: Sprite = Sprite.fromImage("./stage2.png");
    background.scale.x = 1;
    background.scale.y = .6;
    app.stage.addChild(background);

    let player1: Player = new Player;
    player1.car = Sprite.fromImage("./simple-travel-car-top-view.png");
    player1.car.x = 952;
    player1.car.y = 370;
    player1.car.rotation = - Math.PI / 2;
    player1.car.scale.x = .03;
    player1.car.scale.y = .03;
    app.stage.addChild(player1.car);

    function resetPlayer1(): void {
        player1.car.x = 952;
        player1.car.y = 290;
        player1.car.rotation = - Math.PI / 2;
    }

    let player2: Player = new Player;
    player2.car = Sprite.fromImage("./SimpleDarkBlueCarTopView.png");
    player2.car.x = 908;
    player2.car.y = 370;
    player2.car.rotation = - Math.PI / 2;
    player2.car.scale.x = .01;
    player2.car.scale.y = .01;
    app.stage.addChild(player2.car);

    function resetPlayer2(): void {
        player2.car.x = 908;
        player2.car.y = 290;
        player2.car.rotation = - Math.PI / 2;
    }
    
    player1.car.anchor.x = 0.5;
    player1.car.anchor.y = 0.5;
    player2.car.anchor.x = 0.5;
    player2.car.anchor.y = 0.5;

    // Impliment The laps and counters below
    
    let hasWon: boolean = false;
    let p1Lap: number = 3;
    let p2Lap: number = 3;
    let overTheFinishLine1: boolean;
    let overTheFinishLine2: boolean;
    
    let p1HalfLap: number = 3;
    let p2HalfLap: number = 3;
    let overTheHalfLine1: boolean;
    let overTheHalfLine2: boolean;

    // ------------------------------------//
    
    let player1KeyDownLeft: boolean = false;
    let player2KeyDownLeft: boolean = false;
    let player1KeyDownRight: boolean = false;
    let player2KeyDownRight: boolean = false;
    let player1KeyDownUp: boolean = false;
    let player2KeyDownUp: boolean = false;
    let player1KeyDownDown: boolean = false;
    let player2KeyDownDown: boolean = false;
    let stepP1: number = 5;
    let stepP2: number = 5;


    
    window.onkeydown = function(e: KeyboardEvent): void {
        const LEFT: number = 37;
        const UP: number = 38;
        const RIGHT: number = 39;
        const DOWN: number = 40;
        const LEFT2: number = 65;
        const UP2: number = 87;
        const RIGHT2: number = 68;
        const DOWN2: number = 83;
        if (e.keyCode === LEFT) {
            player1KeyDownLeft = true;
            player1.car.rotation -= Math.PI / 20;
        }
        if (e.keyCode === UP) {
            player1KeyDownUp = true;
        }
        if (e.keyCode === RIGHT) {
            player1KeyDownRight = true;
            player1.car.rotation += Math.PI / 20;
        }
        if (e.keyCode === DOWN) {
            player1KeyDownDown = true;
        }
        if (e.keyCode === LEFT2) {
            player2KeyDownLeft = true;
            player2.car.rotation -= Math.PI / 20;
        }
        if (e.keyCode === UP2) {
            player2KeyDownUp = true;
        }
        if (e.keyCode === RIGHT2) {
            player2KeyDownRight = true;
            player2.car.rotation += Math.PI / 20;
        }
        if (e.keyCode === DOWN2) {
            player2KeyDownDown = true;
        }
        // if (e.keyCode === 82 && hasWon === true) {
        //     messageBox.clear();
        //     message.destroy();
        //     p1Lap = 3;
        //     p2Lap = 3;
        //     p1HalfLap = 3;
        //     p2HalfLap = 3;
        //     returnPlayer1();
        //     returnPlayer2();
        //     hasWon = false;
        //     p1LapCounter.destroy();
        //     p1CounterAdded = false;
        //     p2LapCounter.destroy();
        //     p2CounterAdded = false;
        // }
        // if (e.keyCode === 32 && hasWon) {
        //     document.body.removeChild(app.view);
        //     stage2();
        // }
    };
    
    window.onkeyup = function(e: KeyboardEvent): void {
        const LEFT: number = 37;
        const UP: number = 38;
        const RIGHT: number = 39;
        const DOWN: number = 40;
        const LEFT2: number = 65;
        const UP2: number = 87;
        const RIGHT2: number = 68;
        const DOWN2: number = 83;
        if (e.keyCode === LEFT) {
            player1KeyDownLeft = false;
        }
        if (e.keyCode === UP) {
            player1KeyDownUp = false;
    
        }
        if (e.keyCode === RIGHT) {
            player1KeyDownRight = false;
        }
        if (e.keyCode === DOWN) {
            player1KeyDownDown = false;
        }
        if (e.keyCode === LEFT2) {
            player2KeyDownLeft = false;
        }
        if (e.keyCode === UP2) {
            player2KeyDownUp = false;
        }
        if (e.keyCode === RIGHT2) {
            player2KeyDownRight = false;
        }
        if (e.keyCode === DOWN2) {
            player2KeyDownDown = false;
        }
    };

    app.ticker.add(function(delta: number): void {
           
        if (player1KeyDownUp && !touchingwall1) {
                player1.car.y += Math.sin(player1.car.rotation) * stepP1;
                player1.car.x += Math.cos(player1.car.rotation) * stepP1;
        }
        if (player1KeyDownDown) {
            player1.car.y -= Math.sin(player1.car.rotation) * stepP1;
            player1.car.x -= Math.cos(player1.car.rotation) * stepP1;
            touchingwall1 = false;
        }
        if (player1KeyDownLeft) {
            player1.car.rotation -= Math.PI / 30;
        }
        if (player1KeyDownRight) {
            player1.car.rotation += Math.PI / 30;
        }
        if (player2KeyDownUp && !touchingwall2) {
                player2.car.y += Math.sin(player2.car.rotation) * stepP2;
                player2.car.x += Math.cos(player2.car.rotation) * stepP2;
        }
        if (player2KeyDownDown) {
            player2.car.y -= Math.sin(player2.car.rotation) * stepP2;
            player2.car.x -= Math.cos(player2.car.rotation) * stepP2; 
            touchingwall2 = false;
        }
        if (player2KeyDownLeft) {
            player2.car.rotation -= Math.PI / 30;
        }
        if (player2KeyDownRight) {
            player2.car.rotation += Math.PI / 30;
        }
        
        // ------- Colliding ------- //

        if (isColliding2(player1.car, boundary1)) {
            touchingwall1 = true;
        } else if (isColliding2(player1.car, boundary2)) {
            touchingwall1 = true;
        } else if (isColliding2(player1.car, boundary3)) {
            touchingwall1 = true;
        } else if (isColliding2(player1.car, boundary4)) {
            touchingwall1 = true;
        } else {
            touchingwall2 = false;
        }

        if (isColliding2(player2.car, boundary1)) {
            touchingwall2 = true;
        } else if (isColliding2(player2.car, boundary2)) {
            touchingwall2 = true;
        } else if (isColliding2(player2.car, boundary3)) {
            touchingwall2 = true;
        } else if (isColliding2(player2.car, boundary4)) {
            touchingwall2 = true;
        } else {
            touchingwall2 = false;
        }

        // if (!isColliding2(player1.car, boundary1)) {
        //     touchingwall1 = false;
        // }

        // if (!isColliding2(player2.car, boundary1)) {
        //     touchingwall2 = false;
        // }

        // // if (isColliding2(player1.car, boundary2)) {
        // //     touchingwall1 = true;
        // // }

        // if (isColliding2(player2.car, boundary2)) {
        //     touchingwall2 = true;
        // }

        // if (!isColliding2(player1.car, boundary2)) {
        //     touchingwall1 = false;
        // }

        // if (!isColliding2(player2.car, boundary2)) {
        //     touchingwall2 = false;
        // }
    });
    let touchingwall1: boolean = false;
    let touchingwall2: boolean = false;

    let boundary1: Polygon = new Polygon(849, 311, 849, 131, 769, 131, 769, 190, 735, 190, 735, 311);
    let boundary2: Polygon = new Polygon(540, 0, 540, 235, 511, 235, 511, 0);
    let boundary3: Polygon = new Polygon(375, 81, 375, 95, 221, 95, 221, 260, 150, 260, 150, 90, 182, 90, 182, 81);
    let boundary4: Polygon = new Polygon(215, 260, 215, 318, 840, 318, 840, 469, 622, 469, 622, 458, 369, 458, 369, 462, 618, 462, 618, 470, 850, 470, 850, 310, 221, 310, 221, 260);

}

