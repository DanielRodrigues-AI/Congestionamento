import { CarDirection } from "./Car";

export type CarRoute = CarDirection[];
private tryTurn(): void {
    const intersections = [150, 300, 450];

    const nearIntersection = intersections.some(value =>
        Math.abs(this.position.x - value) < this.speed &&
        Math.abs(this.position.y - value) < this.speed
    );

    if (!nearIntersection) {
        return;
    }

    const nextDirection = this.route[this.routeIndex];

    if (!nextDirection) {
        return;
    }

    this.direction = nextDirection;
    this.routeIndex++;
}