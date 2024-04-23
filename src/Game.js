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
        this.load.spritesheet("crab", "../assets/crab/idle/Crab1.png", {
            frameWidth: 18,
            frameHeight: 18
        });
        this.load.spritesheet("acid", "../assets/monsters/acid.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("eyeball", "../assets/monsters/eyeball.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("grimlocke", "../assets/monsters/grimlocke.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("ogre", "../assets/monsters/ogre.png", {
            frameWidth: 16,
            frameHeight: 16
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
        const crabSprite = this.add.sprite(0, 0, "crab");
        crabSprite.setDepth(2);
        crabSprite.setScale(1.5);

        // init acid
        const acidSprite = this.add.sprite(0, 0, "acid");
        acidSprite.setDepth(2);
        acidSprite.setScale(1.5);

        // init eyeball
        const eyeballSprite = this.add.sprite(0, 0, "eyeball");
        eyeballSprite.setDepth(2);
        eyeballSprite.setScale(1.5);

        // init grimlocke
        const grimlockeSprite = this.add.sprite(0, 0, "grimlocke");
        grimlockeSprite.setDepth(2);
        grimlockeSprite.setScale(1.5);

        // init ogre
        const ogreSprite = this.add.sprite(0, 0, "ogre");
        ogreSprite.setDepth(2);
        ogreSprite.setScale(1.5);
        
        // init gridEngine
        const gridEngineConfig = {
            characters: [
                {
                    id: "player",
                    sprite: playerSprite,
                    walkingAnimationMapping: 3,
                    startPosition: {
                        x: 24, y: 24
                    }
                },
                {
                    id: "crab",
                    sprite: crabSprite,
                    startPosition: {
                        x: 12, y: 12
                    }
                },
                {
                    id: "acid",
                    sprite: acidSprite,
                    walkingAnimationMapping: 1,
                    startPosition: {
                        x: 20, y: 20
                    }
                },
                {
                    id: "eyeball",
                    sprite: eyeballSprite,
                    walkingAnimationMapping: 1,
                    startPosition: {
                        x: 30, y: 10
                    }
                },
                {
                    id: "grimlocke",
                    sprite: grimlockeSprite,
                    walkingAnimationMapping: 1,
                    startPosition: {
                        x: 10, y: 20
                    }
                },
                {
                    id: "ogre",
                    sprite: ogreSprite,
                    walkingAnimationMapping: 1,
                    startPosition: {
                        x: 20, y: 5
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
            this.gridEngine.move("player", "down");
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