import { TILE_SIZE } from "./Game";

export const PLAYER_DEPTH = 2;

export class Player {
    constructor(sprite, tilePos) {
        const offsetX = TILE_SIZE / 2;
        const offsetY = TILE_SIZE;
        
        this.sprite = sprite;
        this.sprite.setOrigin(0.5, 1);
        this.sprite.setPosition(
            tilePos.x * TILE_SIZE + offsetX,
            tilePos.y * TILE_SIZE + offsetY
        );
        this.sprite.setFrame(55);
    }

    getPosition() {
        return this.sprite.getBottomCenter();
    }

    setPosition(pos) {
        this.sprite.setPosition(pos.x, pos.y);
    }
}