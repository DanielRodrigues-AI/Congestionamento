import { Car } from "../entities/Car";
import { Intersection } from "../maps/Intersection";
export class SimulationEngine {
    private animationFrameId?: number;
    private running = false;

constructor(
    private cars: Car[],
    private render: () => void,
    private intersections: Intersection[] = []
) {}

    start(): void {
        if (this.running) {
            return;
        }

        this.running = true;

let lastTime = performance.now();

const loop = (currentTime: number) => {
    if (!this.running) {
        return;
    }

    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    this.intersections.forEach(i => i.update(deltaTime));
    this.cars.forEach(car => {
    let movement: "go" | "stop" = "go";
    let targetSpeed = car.speed;
    this.intersections.forEach((intersection: any) => {
        const { x, y } = intersection.position;

if (car.direction === "right" && Math.abs(car.position.y - y) < 15 && car.position.x < x - 30) {
    if (intersection.horizontalLight.state === "red") {
        const frontX = car.position.x + 30;
        const stopLine = x - 30;
        if (frontX >= stopLine) { car.position.x = stopLine - 30; movement = "stop"; }
        else if (frontX > stopLine - 1) movement = "stop";
    }
}

if (car.direction === "down" && Math.abs(car.position.x - x) < 15 && car.position.y < y - 30) {
    if (intersection.verticalLight.state === "red") {
        const frontY = car.position.y + 30;
        const stopLine = y - 30;
        if (frontY >= stopLine) { car.position.y = stopLine - 30; movement = "stop"; }
        else if (frontY > stopLine - 1) movement = "stop";
    }
}
    });

    if (movement === "go") {
        this.cars.forEach(other => {
            if (other === car) return;
            const minDist = car.size === "normal" ? 35 : 18;

            if (car.direction === "right" && other.direction === "right" &&
                Math.abs(car.position.y - other.position.y) < 15 &&
                other.position.x > car.position.x) {
                const dist = other.position.x - (car.position.x + 30);
                if (dist < minDist) targetSpeed = Math.max(0, other.currentSpeed * (dist / minDist));
            }

            if (car.direction === "down" && other.direction === "down" &&
                Math.abs(car.position.x - other.position.x) < 15 &&
                other.position.y > car.position.y) {
                const dist = other.position.y - (car.position.y + 30);
                if (dist < minDist) targetSpeed = Math.max(0, other.currentSpeed * (dist / minDist));
            }
        });

        car.currentSpeed += (targetSpeed - car.currentSpeed) * 0.1;
    }

    car.update(movement);
});

            this.render();

            this.animationFrameId = requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
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