import { Position } from "../types/SimulationTypes";
import { CarRoute } from "./CarRoute";

export type CarDirection = "right" | "left" | "up" | "down";

export class Car {
  position: Position;
  speed: number;
  currentSpeed: number;
  direction: CarDirection;
  color: string;
  size: "normal" | "small" | "medium";
  private route: CarRoute;
  private routeIndex = 0;

  constructor(
    x: number,
    y: number,
    route: CarRoute = [],
    direction: CarDirection,
    speed: number = 1,
    size: "normal" | "small" | "medium" = "normal",
    color: string = "#2196f3",
  ) {
    this.color = color;
    this.size = size;
    this.position = { x, y };
    this.direction = direction;
    this.route = route;
    this.speed = speed;
    this.currentSpeed = speed;
  }

  private tryTurn(): void {
    const intersections = [150, 300, 450];

    const nearIntersection = intersections.some(value =>
      Math.abs(this.position.x - value) < this.speed &&
      Math.abs(this.position.y - value) < this.speed,
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

update(movement: "go" | "stop" = "go"): void {
    if (movement === "stop") { this.currentSpeed = 0; return; }
    this.tryTurn();

    switch (this.direction) {
      case "right":
        this.position.x += this.currentSpeed;

        if (this.position.x > 830) {
          this.position.x = -30;
        }

        break;

      case "left":
        this.position.x -= this.currentSpeed;

        if (this.position.x < -30) {
          this.position.x = 830;
        }

        break;

      case "down":
        this.position.y += this.currentSpeed;

        if (this.position.y > 630) {
          this.position.y = -30;
        }

        break;

      case "up":
        this.position.y -= this.currentSpeed;

        if (this.position.y < -30) {
          this.position.y = 630;
        }

        break;
    }
  }
}
