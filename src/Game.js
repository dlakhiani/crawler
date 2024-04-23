import * as Phaser from "phaser";
import { Player } from "./Player";
import { GridEngine } from "grid-engine";

const sceneConfig = {
    active: false,
    visible: false,
    key: "Game",
};

const WIDTH = 840;
const HEIGHT = 480;

export const TILE_SIZE = 24;
export const SCALE = 2;

export class GameScene extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }

    preload() {
        this.load.image("tiles", "../assets/scene.png");
        this.load.tilemapTiledJSON("mainCity", "../assets/mainCity.json");

        this.load.spritesheet("player", "../assets/characters.png", {
            frameWidth: 26,
            frameHeight: 36,
        });
        this.load.atlas("crab", "../assets/crab/idle/crabs.png", "../assets/crab/idle/crabs.json", {
          
        });
    }

    create() {

        // init map
        const mainCityTilemap = this.make.tilemap({ 
            key: "mainCity" 
        });
        mainCityTilemap.addTilesetImage("Main City", "tiles");

        for (let i = 0; i < mainCityTilemap.layers.length; i++) {
          const layer = mainCityTilemap.createLayer(i, "Main City", 0, 0)
          layer.setDepth(i);
          layer.setScale(SCALE);
        }
        
        // init player
        const playerSprite = this.add.sprite(0, 0, "player");
        playerSprite.setDepth(2);
        playerSprite.setScale(SCALE);

        // camera follows player
        this.cameras.main.startFollow(playerSprite);
        this.cameras.main.setRoundPixels(true);

        // init crab
        this.crab=this.add.sprite(200,300,'crab');
        this.crab.setDepth(2);
        this.crab.setScale(SCALE);
         var frameNames = this.textures.get('crab').getFrameNames();;
 this.anims.create({
    key: 'idle',
    frames: [
        { key: 'crab',frame:"Crab1.png" },
        { key: 'crab',frame:"Crab2.png" },
        { key: 'crab',frame:"Crab3.png" },
        { key: 'crab',frame:"Crab4.png" },
        { key: 'crab',frame:"Crab5.png" }
    ],
    frameRate: 8,
    repeat: -1
});
this.crab.play("idle");

        // init gridEngine
        const gridEngineConfig = {
            characters: [
                {
                    id: "player",
                    sprite: playerSprite,
                    walkingAnimationMapping: 2,
                    startPosition: {
                        x: 24, y: 24
                    }
                },
                {
                    id: "crab",
                    sprite: this.crab,
                    startPosition: {
                        x: 25, y: 12
                    }
                },
            ],
            collisionTilePropertyName: "hasCollision",
        }
        

        this.gridEngine.create(
            mainCityTilemap,
            gridEngineConfig
        )

    }

    update() {
        const keys = this.input.keyboard.createCursorKeys();
        if (keys.left.isDown)
            this.gridEngine.move("player", "left");
        else if (keys.up.isDown)
            this.gridEngine.move("player", "up");
        else if (keys.right.isDown)
            this.gridEngine.move("player", "right");
        else if (keys.down.isDown)
            this.gridEngine.move("player", "down")
    }
}

export const gameConfig = {
    title: "Sample",
    render: {
        antialias: false,
    },
    type: Phaser.AUTO,
    scene: GameScene,
    scale: {
        width: WIDTH,
        height: HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade"
    },
    plugins: {
        scene: [
            {
                key: "gridEngine",
                plugin: GridEngine,
                mapping: "gridEngine",
            },
        ],
    },
    parent: "game"
};