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

    // Impliment The laps and counters below // 
    
    let hasWon: boolean = false;
    let p1Lap: number = 3;
    let p2Lap: number = 3;
    let overTheFinishLine1: boolean;
    let overTheFinishLine2: boolean;
    
    let p1HalfLap: number = 3;
    let p2HalfLap: number = 3;
    let overTheHalfLine1: boolean;
    let overTheHalfLine2: boolean;

    // ------------------------------------ //
    
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

    // --------- Displays --------- //

    let p1CounterAdded: boolean = false;
    let p2CounterAdded: boolean = false;
    let p1LapCounter: Text = new Text;
    let p2LapCounter: Text = new Text;

    
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
        } else if (isColliding2(player1.car, boundary5)) {
                touchingwall1 = true;
        } else if (isColliding2(player1.car, boundary6)) {
            touchingwall1 = true;
        } else if (isColliding2(player1.car, boundary7)) {
            touchingwall1 = true;
        } else if (isColliding2(player1.car, boundary8)) {
            touchingwall1 = true;
        } else {
            touchingwall1 = false;
        }

        if (isColliding2(player2.car, boundary1)) {
            touchingwall2 = true;
        } else if (isColliding2(player2.car, boundary2)) {
            touchingwall2 = true;
        } else if (isColliding2(player2.car, boundary3)) {
            touchingwall2 = true;
        } else if (isColliding2(player2.car, boundary4)) {
            touchingwall2 = true;
        } else if (isColliding2(player2.car, boundary5)) {
                touchingwall2 = true;
        } else if (isColliding2(player2.car, boundary6)) {
            touchingwall2 = true;
        } else if (isColliding2(player2.car, boundary7)) {
            touchingwall2 = true;
        } else if (isColliding2(player2.car, boundary8)) {
            touchingwall2 = true;
        } else {
            touchingwall2 = false;
        }

        if (!isColliding(player1.car, outBounds)) {
            resetPlayer1();
        }

        if (!isColliding(player2.car, outBounds)) {
            resetPlayer2();
        }

        if (isColliding3(player1.car, player2.car)) {
            player1.car.x = player1.car.x + random(-10, 10);
            player1.car.y = player1.car.y + random(-10, 10);
            player2.car.x = player2.car.x + random(-10, 10);
            player2.car.y = player2.car.y + random(-10, 10); 
        }
        

        // -------- End Colliding -------- //

        // ---------- Game Logic ---------- //

        if (isColliding(player1.car, halfwayLine)) {
            if (p1Lap === 3 && !overTheHalfLine1) {
                p1HalfLap = 2;
                overTheHalfLine1 = true;
            } else if (p1Lap === 2 && !overTheHalfLine1) {
                p1HalfLap = 1;
                overTheHalfLine1 = true;
            } else if (p1Lap === 1 && !overTheHalfLine1) {
                p1HalfLap = 0;
                overTheHalfLine1 = true;
            }
        }
        if (!isColliding(player1.car, halfwayLine)) {
            overTheHalfLine1 = false;
        }
    
        if (isColliding(player2.car, halfwayLine)) {
            if (p2Lap === 3 && !overTheHalfLine2) {
                p2HalfLap = 2;
                overTheHalfLine2 = true;
            } else if (p2Lap === 2 && !overTheHalfLine2) {
                p2HalfLap = 1;
                overTheHalfLine2 = true;
            } else if (p2Lap === 1 && !overTheHalfLine2) {
                p2HalfLap = 0;
                overTheHalfLine2 = true;
            }
        }
        if (!isColliding(player2.car, halfwayLine)) {
            overTheHalfLine2 = false;
        }

        if (isColliding(player1.car, finishLine)) {
            if (p1Lap === 3 && overTheFinishLine1 === false && p1HalfLap === 2) {
                p1Lap = 2;
                overTheFinishLine1 = true;
                p1LapCounter.destroy();
                p1CounterAdded = false;
            } else if (p1Lap === 2 && overTheFinishLine1 === false && p1HalfLap === 1) {
                p1Lap = 1;
                overTheFinishLine1 = true;
                p1LapCounter.destroy();
                p1CounterAdded = false;
            } else if (p1Lap === 1 && overTheFinishLine1 === false && p1HalfLap === 0) {
                p1Lap = 0;
                overTheFinishLine1 = true;
                p1LapCounter.destroy();
                p1CounterAdded = false;
                hasWon = true;
                player1Wins();
            }
        }
        
        if (isColliding(player2.car, finishLine)) {
            if (p2Lap === 3 && overTheFinishLine2 === false && p2HalfLap === 2) {
                p2Lap = 2;
                overTheFinishLine2 = true;
                p2LapCounter.destroy();
                p2CounterAdded = false;
            } else if (p2Lap === 2 && overTheFinishLine2 === false && p2HalfLap === 1) {
                p2Lap = 1;
                overTheFinishLine2 = true;
                p2LapCounter.destroy();
                p2CounterAdded = false;
            } else if (p2Lap === 1 && overTheFinishLine2 === false && p2HalfLap === 0) {
                p2Lap = 0;
                overTheFinishLine2 = true;
                p2LapCounter.destroy();
                p2CounterAdded = false;
                hasWon = true;
                player2Wins();
            }
        }

        if (!isColliding(player1.car, finishLine)) {
            overTheFinishLine1 = false;
        }
        if (!isColliding(player2.car, finishLine)) {
            overTheFinishLine2 = false;
        }

        // ---------- End Game Logic ---------- //

        // ---------- Begin Displays ---------- //

        if (!p1CounterAdded) {
            p1LapCounter = new Text("P1: " + p1Lap + " laps left!");
            p1CounterAdded = true;
            p1LapCounter.x = 550;
            p1LapCounter.y = 11;
            p1LapCounter.style.fill = 0xcc0000;
            app.stage.addChild(p1LapCounter);
        }
        
        if (!p2CounterAdded) {
            p2LapCounter = new Text("P2: " + p2Lap + " laps left!");
            p2CounterAdded = true;
            p2LapCounter.x = 550;
            p2LapCounter.y = 55;
            p2LapCounter.style.fill = 0x4444aa;
            app.stage.addChild(p2LapCounter);
        }

    });

    let touchingwall1: boolean = false;
    let touchingwall2: boolean = false;

    let boundary1: Polygon = new Polygon(849, 311, 849, 131, 769, 131, 769, 190, 735, 190, 735, 311);
    let boundary2: Polygon = new Polygon(540, 0, 540, 235, 511, 235, 511, 0);
    let boundary3: Polygon = new Polygon(375, 81, 375, 95, 221, 95, 221, 260, 150, 260, 150, 90, 182, 90, 182, 81);
    let boundary4: Polygon = new Polygon(215, 260, 215, 318, 840, 318, 840, 469, 622, 469, 622, 458, 369, 458, 369, 462, 618, 462, 618, 470, 850, 470, 850, 310, 221, 310, 221, 260);
    let boundary5: Polygon = new Polygon(10, 370, 630, 370, 630, 375, 662, 375, 662, 399, 585, 399, 585, 385, 10, 385);
    let boundary6: Polygon = new Polygon(840, 319, 840, 466, 625, 466, 625, 455, 311, 455, 185, 491, 185, 510, 240, 510, 400, 460, 615, 460, 615, 470, 849, 470, 849, 320);
    let boundary7: Polygon = new Polygon(510, 520, 510, 536, 520, 536, 520, 520);
    let boundary8: Polygon = new Polygon(510, 560, 510, 610, 520, 610, 520, 560);

    let boundaries: Polygon[] = [
        boundary1,
        boundary2,
        boundary3,
        boundary4,
        boundary5,
        boundary6,
        boundary7,
        boundary8
    ];

    let outBounds: Rectangle = new Rectangle(0, 0, 1024, 614);

    let finishLine: Rectangle = new Rectangle(850, 330, 270, 15);
    let halfwayLine: Rectangle = new Rectangle(0, 100, 150, 15); 

    // ------ End Game --- //
    
    let messageBox: Graphics = new Graphics();
    let message: Text;

    function player1Wins(): void {
        message = new Text("Player One Wins!!!");
        message.x = 460;
        message.y = 236;
        message.style.fill = 0xffffff;
        messageBox.beginFill(0xcc0000);
        messageBox.drawRect(0, 0, 225, 50);
        messageBox.x = 512 - 45;
        messageBox.y = 307 - 25;
        app.stage.addChild(messageBox);
        app.stage.addChild(message);
        hasWon = true;
    }
    
    function player2Wins(): void {
        message = new Text("Player Two Wins!!!");
        message.x = 460;
        message.y = 236;
        message.style.fill = 0xffffff;
        messageBox.beginFill(0x4444aa);
        messageBox.drawRect(0, 0, 225, 50);
        messageBox.x = 512 - 45;
        messageBox.y = 307 - 25;
        app.stage.addChild(messageBox);
        app.stage.addChild(message);
        hasWon = true;    
    }
}