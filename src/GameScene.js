import * as Phaser from "phaser";
import { GridEngine } from "grid-engine";

const sceneConfig = {
  active: false,
  visible: false,
  key: "GameScene",
};

export const TILE_SIZE = 24;
export const SCALE = 2;

export class GameScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  preload() {
    this.load.image("menu", "../assets/menu.png");
    this.load.image("button", "../assets/button.png");

    this.load.image("tiles", "../assets/scene.png");
    this.load.tilemapTiledJSON("mainCity", "../assets/mainCity.json");

    this.load.spritesheet("player", "../assets/characters.png", {
      frameWidth: 26,
      frameHeight: 36,
    });
    this.load.atlas(
      "crab",
      "../assets/crab/idle/crabs.png",
      "../assets/crab/idle/crabs.json",
      {}
    );
    this.load.atlas(
      "ogre",
      "../assets/ogre/idle/ogres.png",
      "../assets/ogre/idle/ogres.json",
      {}
    );
  }

  create() {
    // init map
    const mainCityTilemap = this.make.tilemap({
      key: "mainCity",
    });
    mainCityTilemap.addTilesetImage("Main City", "tiles");

    for (let i = 0; i < mainCityTilemap.layers.length; i++) {
      const layer = mainCityTilemap.createLayer(i, "Main City", 0, 0);
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
    this.crab = this.add.sprite(0, 0, "crab");
    this.crab.setDepth(2);
    this.crab.setScale(1.5);

    // init ogre
    this.ogre = this.add.sprite(0, 0, "ogre");
    this.ogre.setDepth(2);
    this.ogre.setScale(3);

    this.anims.create({
      key: "idleCrab",
      frames: this.makeAnim("crab", "Crab"),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "idleOgre",
      frames: this.makeAnim("ogre", "Ogre"),
      frameRate: 8,
      repeat: -1,
    });

    this.crab.play("idleCrab");
    this.ogre.play("idleOgre");

    // init gridEngine
    const gridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          walkingAnimationMapping: 5,
          startPosition: {
            x: 24,
            y: 24,
          },
        },
        {
          id: "crab",
          sprite: this.crab,
          startPosition: {
            x: 25,
            y: 12,
          },
        },
        {
          id: "ogre",
          sprite: this.ogre,
          startPosition: {
            x: 12,
            y: 12,
          },
        },
      ],
      collisionTilePropertyName: "hasCollision",
    };

    this.gridEngine.create(mainCityTilemap, gridEngineConfig);
    
    this.gridEngine.moveRandomly("crab", Math.floor(Math.random() * 1500) + 1);
    this.gridEngine.moveRandomly("ogre", Math.floor(Math.random() * 1500) + 1);
  }

  makeAnim(key, frameName) {
    let npcArray = [];
    for (let i = 0; i < 5; i++) {
      let fn = frameName + i + ".png";
      npcArray.push({
        key: key,
        frame: fn,
      });
    }
    return npcArray;
  }

  update() {
    const keys = this.input.keyboard.createCursorKeys();
    if (keys.left.isDown) this.gridEngine.move("player", "left");
    else if (keys.up.isDown) this.gridEngine.move("player", "up");
    else if (keys.right.isDown) this.gridEngine.move("player", "right");
    else if (keys.down.isDown) this.gridEngine.move("player", "down");
  }
}
