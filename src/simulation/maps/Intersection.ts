import { Position } from "../types/SimulationTypes";
import { TrafficLight } from "../entities/TrafficLight";

export class Intersection {
    public verticalLight = new TrafficLight("green");
    public horizontalLight = new TrafficLight("red");
    private elapsedTime = 0;

    constructor(public position: Position) {}

update(deltaTime: number): void {
    this.elapsedTime += deltaTime;
    const cycle = this.elapsedTime % 26000;

    if (cycle < 10000) {
        this.verticalLight.state = "green";
        this.horizontalLight.state = "red";
    } else if (cycle < 13000) {
        this.verticalLight.state = "yellow";
        this.horizontalLight.state = "red";
    } else if (cycle < 23000) {
        this.verticalLight.state = "red";
        this.horizontalLight.state = "green";
    } else {
        this.verticalLight.state = "red";
        this.horizontalLight.state = "yellow";
    }
}
}