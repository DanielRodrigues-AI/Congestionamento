export type TrafficLightState = "green" | "yellow" | "red";

export class TrafficLight {
    constructor(public state: TrafficLightState = "red") {}
}