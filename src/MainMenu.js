import * as Phaser from "phaser";
import { GameScene } from "./GameScene";
import { GridEngine } from "grid-engine";

const sceneConfig = {
  active: false,
  visible: false,
  key: "MainMenu",
};

const WIDTH = 840;
const HEIGHT = 480;

export class MainMenu extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  create() {
    const helloButton = this.add.text(100, 100, "Hello Phaser!", {
      fill: "#0f0",
    });
    helloButton.setInteractive();

    helloButton.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }
}

export const gameConfig = {
  title: "Sample",
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: [MainMenu, GameScene],
  scale: {
    width: WIDTH,
    height: HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
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
  parent: "game",
};