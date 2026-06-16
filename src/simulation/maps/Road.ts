import { Position, RoadDirection } from "../types/SimulationTypes";

export class Road {
    constructor(
        public start: Position,
        public end: Position,
        public direction: RoadDirection,
        public width: number = 40
    ) {}
}