import { Car } from "../entities/Car";

export class CarRenderer {
    constructor(
        private ctx: CanvasRenderingContext2D
    ) {}

    render(cars: Car[]): void {
        this.ctx.fillStyle = "#2196f3";

        cars.forEach(car => {
            this.ctx.fillRect(
                car.position.x,
                car.position.y - 10,
                30,
                20
            );
        });
    }
}