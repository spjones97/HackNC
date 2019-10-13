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

import { stage2 } from "./stage2-helpers";

export function stage1(): void {


    let app: Application = new Application(1199.25, 474.75);
    document.body.appendChild(app.view);

    let background: Sprite = Sprite.fromImage("./bfqatt.jpg");
    background.scale.x = 0.75;
    background.scale.y = 0.375;
    app.stage.addChild(background);







    class Player {
        car: Sprite;
    }

    let oilSlick: Player = new Player;
    oilSlick.car = Sprite.fromImage("./oilslick.png");
    oilSlick.car.x = 930;
    oilSlick.car.y = 80;
    oilSlick.car.scale.x = 0.5;
    oilSlick.car.scale.y = 0.5;
    app.stage.addChild(oilSlick.car);

    let player1: Player = new Player;
    player1.car = Sprite.fromImage("./simple-travel-car-top-view.png");
    player1.car.x = 140;
    player1.car.y = 320;
    player1.car.rotation =  - Math.PI / 2;
    player1.car.scale.x = .04;
    player1.car.scale.y = .04;
    app.stage.addChild(player1.car);

    function returnPlayer1(): void {
        player1.car.x = 140;
        player1.car.y = 320; 
        player1.car.rotation =  - Math.PI / 2;
    }

    let player2: Player = new Player;
    player2.car = Sprite.fromImage("./SimpleDarkBlueCarTopView.png");
    player2.car.x = 70;
    player2.car.y = 320;
    player2.car.rotation = - Math.PI / 2;
    player2.car.scale.x = .01333333333;
    player2.car.scale.y = .01333333333;
    app.stage.addChild(player2.car);

    function returnPlayer2(): void {
        player2.car.x = 70;
        player2.car.y = 320;
        player2.car.rotation = - Math.PI / 2;
    }

    player1.car.anchor.x = 0.5;
    player1.car.anchor.y = 0.5;
    player2.car.anchor.x = 0.5;
    player2.car.anchor.y = 0.5;

    let player1KeyDownLeft: boolean = false;
    let player2KeyDownLeft: boolean = false;
    let player1KeyDownRight: boolean = false;
    let player2KeyDownRight: boolean = false;
    let player1KeyDownUp: boolean = false;
    let player2KeyDownUp: boolean = false;
    let player1KeyDownDown: boolean = false;
    let player2KeyDownDown: boolean = false;
    let stepP1: number;
    let stepP2: number;

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
        if (e.keyCode === 82 && hasWon === true) {
            messageBox.clear();
            message.destroy();
            p1Lap = 3;
            p2Lap = 3;
            p1HalfLap = 3;
            p2HalfLap = 3;
            returnPlayer1();
            returnPlayer2();
            hasWon = false;
            p1LapCounter.destroy();
            p1CounterAdded = false;
            p2LapCounter.destroy();
            p2CounterAdded = false;
        }
        if (e.keyCode === 32 && hasWon) {
            document.body.removeChild(app.view);
            stage2();
        }
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

    let p1Lap: number = 3;
    let p2Lap: number = 3;
    let overTheFinishLine1: boolean;
    let overTheFinishLine2: boolean;

    let p1HalfLap: number = 3;
    let p2HalfLap: number = 3;
    let overTheHalfLine1: boolean;
    let overTheHalfLine2: boolean;

    let p1LapCounter: Text = new Text;
    let p1CounterAdded: boolean = false;
    let p2LapCounter: Text = new Text;
    let p2CounterAdded: boolean = false;




    app.ticker.add(function(delta: number): void {
        if (!p1CounterAdded) {
            p1LapCounter = new Text("P1: " + p1Lap + " laps left!");
            p1CounterAdded = true;
            p1LapCounter.x = 960;
            p1LapCounter.y = 20;
            p1LapCounter.style.fill = 0xcc0000;
            app.stage.addChild(p1LapCounter);
        }
        
        if (!p2CounterAdded) {
            p2LapCounter = new Text("P2: " + p2Lap + " laps left!");
            p2CounterAdded = true;
            p2LapCounter.x = 650;
            p2LapCounter.y = 20;
            p2LapCounter.style.fill = 0x4444aa;
            app.stage.addChild(p2LapCounter);
        }

        if (player1KeyDownUp) {
                player1.car.y += Math.sin(player1.car.rotation) * stepP1;
                player1.car.x += Math.cos(player1.car.rotation) * stepP1;
        }
        if (player1KeyDownDown) {
            player1.car.y -= Math.sin(player1.car.rotation) * stepP1;
            player1.car.x -= Math.cos(player1.car.rotation) * stepP1;
        }
        if (player1KeyDownLeft) {
            player1.car.rotation -= Math.PI / 30;
        }
        if (player1KeyDownRight) {
            player1.car.rotation += Math.PI / 30;
        }
        if (player2KeyDownUp) {
                player2.car.y += Math.sin(player2.car.rotation) * stepP2;
                player2.car.x += Math.cos(player2.car.rotation) * stepP2;
        }
        if (player2KeyDownDown) {
            player2.car.y -= Math.sin(player2.car.rotation) * stepP2;
            player2.car.x -= Math.cos(player2.car.rotation) * stepP2; 
        }
        if (player2KeyDownLeft) {
            player2.car.rotation -= Math.PI / 30;
        }
        if (player2KeyDownRight) {
            player2.car.rotation += Math.PI / 30;
        }
        if (isColliding(player1.car, boundry1)) {
            returnPlayer1();
        }
        if (isColliding(player2.car, boundry1)) {
            returnPlayer2();
        }
        if (isColliding(player1.car, boundry2)) {
            returnPlayer1();
        }
        if (isColliding(player2.car, boundry2)) {
            returnPlayer2();
        }
        if (isColliding2(player1.car, boundry3)) {
            returnPlayer1();
        }
        if (isColliding2(player2.car, boundry3)) {
            returnPlayer2();
        }
        if (isColliding2(player1.car, boundry4)) {
            returnPlayer1();
        }
        if (isColliding2(player2.car, boundry4)) {
            returnPlayer2();
        }
        if (isColliding2(player1.car, boundry5)) {
            returnPlayer1();
        }
        if (isColliding2(player2.car, boundry5)) {
            returnPlayer2();
        }
        if (!isColliding2(player1.car, boundry6)) {
            if (player1.car.x < 7000) {
                returnPlayer1();
            }
            
        }
        if (!isColliding2(player2.car, boundry6)) {
            if (player2.car.y < 7000) {
                returnPlayer2();
            }
            
        }
        if (isColliding2(player1.car, boundry7)) {
            returnPlayer1();
        }
        if (isColliding2(player2.car, boundry7)) {
            returnPlayer2();
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
                player1Wins();
                p1LapCounter.destroy();
                p1CounterAdded = false;
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
                player2Wins();
            }
        }
        if (!isColliding(player1.car, finishLine)) {
            overTheFinishLine1 = false;
        }
        if (!isColliding(player2.car, finishLine)) {
            overTheFinishLine2 = false;
        }

        if (isColliding3(player1.car, oilSlick.car)) {
            stepP1 = 2;
        } else if (!(isColliding3(player1.car, oilSlick.car))) {
            stepP1 = 5;
        }

        if (isColliding3(player2.car, oilSlick.car)) {
            stepP2 = 2;
        } else if (!(isColliding3(player2.car, oilSlick.car))) {
            stepP2 = 5;
        }

        if (isColliding(player1.car, halfway)) {
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
        if (!isColliding(player1.car, halfway)) {
            overTheHalfLine1 = false;
        }

        if (isColliding(player2.car, halfway)) {
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
        if (!isColliding(player2.car, halfway)) {
            overTheHalfLine2 = false;
        }

        // if (!(isColliding3(player1.car, player2.car))) {
        //     stepP1 = 5;
        //     stepP2 = 5;
        // }

        if (isColliding3(player1.car, player2.car)) {
            let x: number = random(1, 300000);
            if (x === 1) {
                runTransformer(player1.car.x, player1.car.y);
            } else {
                // stepP1 = 10;
                // stepP2 = 10;
                player1.car.x = player1.car.x + random(-10, 10);
                player1.car.y = player1.car.y + random(-10, 10);
                player2.car.x = player2.car.x + random(-10, 10);
                player2.car.y = player2.car.y + random(-10, 10);
            }
            
            
        }
        // make a collider for a wreck
        
        count = count + 0.04;
        
        if (transformerRun) {
            count2 = count2 + .075;
            transformer.car.x = transformer.car.x + Math.cos(transformer.car.rotation) * stepP1 * 0.1;
            transformer.car.y = transformer.car.y + Math.sin(transformer.car.rotation) * stepP1 * 0.1;
            p1LapCounter.rotation = count;
            p1LapCounter.style.fontSize = count2;
        }
        

    });

    let count: number = 0;
    let count2: number = 0;
    let transformer: Player = new Player;
    let transformerRun: boolean = false;

    function runTransformer(x: number, y: number): void {
            player1.car.x = 90000;
            player2.car.y = 90000; 
            transformer.car = Sprite.fromImage("./SimpleDarkBlueCarTopView.png");
            transformer.car.anchor.x = 0.5;
            transformer.car.anchor.y = 0.5;
            transformer.car.x = x;
            transformer.car.y = y;
            transformer.car.scale.x = .1;
            transformer.car.scale.y = .1;
            app.stage.addChild(transformer.car);
            transformer.car.rotation = Math.random() * 2 * Math.PI;
            transformerRun = true;
            p1LapCounter.anchor.x = .5;
            p1LapCounter.x = 600;
            p1LapCounter.anchor.y = 0.5;
            p1LapCounter.y = 235;
            p2LapCounter.x = 2000;
            p1LapCounter.text = "AUTOBOTS ROLL OUT"; 
            
    }

    let finishLine: Rectangle = new Rectangle(31, 271, 159, 20);
    let halfway: Rectangle = new Rectangle(940, 180, 260, 20);

    let boundry1: Rectangle = new Rectangle(260, 110, 15, 180);
    let boundry2: Rectangle = new Rectangle(290, 280, 490, 15);
    let boundry3: Polygon = new Polygon(780, 270, 780, 290, 950, 190, 930, 180);
    let boundry4: Polygon = new Polygon(460, 35, 550, 100, 550, 135, 510, 190, 610, 100, 600, 10);
    let boundry5: Polygon = new Polygon(200, 270, 200, 380, 430, 315);
    let boundry6: Polygon = new Polygon(0, 0, 0, 485, 1200, 485, 1200, 0);
    let boundry7: Polygon = new Polygon(540, 405, 330, 480, 750, 480, 740, 450);


    let hasWon: boolean = false;

    let messageBox: Graphics = new Graphics();
    let message: Text;


    function player1Wins(): void {
        message = new Text("Player One Wins!!!");
        message.x = 460;
        message.y = 236;
        message.style.fill = 0xffffff;
        messageBox.beginFill(0xcc0000);
        messageBox.drawRect(0, 0, 225, 50);
        messageBox.x = 500 - 45;
        messageBox.y = 256 - 25;
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
        messageBox.x = 500 - 45;
        messageBox.y = 256 - 25;
        app.stage.addChild(messageBox);
        app.stage.addChild(message);
        hasWon = true;    
    }
}
export function isColliding(a: DisplayObject, b: Rectangle): boolean {
    const ab: Rectangle = a.getBounds();
    const bb: Rectangle = b;
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

export function isColliding2(a: DisplayObject, b: Polygon): boolean {
    const ab: Rectangle = a.getBounds();
    const bb: Polygon = b;
    return bb.contains(ab.x, ab.y);
}

export function isColliding3(a: DisplayObject, b: DisplayObject): boolean {
    const ab: Rectangle = a.getBounds();
    const bb: Rectangle = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}
