import { Car } from "../entities/Car";

export class SimulationEngine {
    private animationFrameId?: number;
    private running = false;

    constructor(
        private cars: Car[],
        private render: () => void
    ) {}

    start(): void {
        if (this.running) {
            return;
        }

        this.running = true;

        const loop = () => {
            if (!this.running) {
                return;
            }

            this.cars.forEach(car => car.update());

            this.render();

            this.animationFrameId = requestAnimationFrame(loop);
        };

        loop();
    }

    pause(): void {
        this.running = false;

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    reset(): void {
        this.pause();

        this.cars.forEach((car, index) => {
            car.position.x = -(index * 200);
        });
    }
}