import { Car } from "../entities/Car";

export class CarRenderer {
    constructor(
        private ctx: CanvasRenderingContext2D
    ) {}

    render(cars: Car[]): void {

cars.forEach(car => {
    this.ctx.fillStyle = car.color;
    const w = car.size === "small" ? 10 : car.size === "medium" ? 15 : 20;
    const h = car.size === "small" ? 15 : car.size === "medium" ? 20 : 30;
if (car.direction === "up" || car.direction === "down") {
    this.ctx.fillRect(car.position.x - w / 2, car.position.y, w, h);
} else {
    this.ctx.fillRect(car.position.x, car.position.y - h / 2, h, w);
}
});
    }
}