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

// Game.MainMenu = function(game){

// };

// var menu

// Game.MainMenu.prototype = {
//     create:function(game){
//         this.createButton(game,"Play",game.world.centerX,game.world.centerY + 32, 300, 100,

//         function(){
//             this.scene.start('MainMenu');
//         });
//         this.createButton(game,"Options",game.world.centerX,game.world.centerY + 192, 300, 100,

//         function(){
//             console.log('About');
//         });

//         menu = game.add.sprite(game.world.centerX,game.world.centerY - 192, 'menu');
//         titlescreen.anchor.SetTo(0.5,0.5);
//     },

//     update:function(game){

//     },

//     createButton: function(game, string,x,y,w,h,callback){
//         var button1 = game.add.button(x,y,'button',callback,this,2,1,0);

//         button1.anchor.SetTo(0.5,0.5);
//         button1.width = w;
//         button1.height = h;

//         var txt = game.add.text(button1.x,button1.y, string, {font:"14px Arial" , fill:"#fff", align:"center"});

//         txt.anchor.SetTo(0.5,0.5);

//     }
// }
