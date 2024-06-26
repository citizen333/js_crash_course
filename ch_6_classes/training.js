class Actor {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    distanceTo(otherActor) {
        let dx = otherActor.x - this.x;
        let dy = otherActor.y - this.y;
        return Math.hypot(dx, dy);
    }
}

class Player extends Actor {
    constructor(startX, startY) {
        super(startX, startY);
        this.hp = 100;
    }
}

class Enemy extends Actor {
    atack(player) {
        if (this.distanceTo(player) < 4) {
            player.hp -= 10;
            return true;
        } else {
            return false;
        }
    }
}

class Follower extends Actor {
    constructor(startX, startY, player) {
        super(startX, startY);
        this.player = player;
    }

    follow() {
        this.x = this.player.x;
        this.y = this.player.y;
    }
}