import { useEffect, useRef } from "react";

import { Car } from "../../simulation/entities/Car";
import { GridMap } from "../../simulation/maps/GridMap";
import { CarRenderer } from "../../simulation/renderer/CarRenderer";
import { MapRenderer } from "../../simulation/renderer/MapRenderer";
import { SimulationEngine } from "../../simulation/engine/SimulationEngine";

export function SimulationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const map = new GridMap();

    const mapRenderer = new MapRenderer(ctx, map);
    const carRenderer = new CarRenderer(ctx);

const cars = [
    new Car(0, 150, ["down", "right"], "right", 1),
    new Car(-200, 300, ["down", "right"], "right", 1.5),
    new Car(-400, 450, ["down", "right"], "right", 2),

    new Car(150, 0, ["right", "down"], "down", 1.2),
    new Car(300, -200, ["right", "down"], "down", 1.6),
    new Car(450, -400, ["right", "down"], "down", 2),

    new Car(-100, 150, ["down", "right"], "right", 1.3, "small", "#4caf50"),
    new Car(-300, 300, ["down", "right"], "right", 1.8, "small", "#4caf50"),
    new Car(-500, 450, ["down", "right"], "right", 2.2, "small", "#4caf50"),

    new Car(150, -100, ["right", "down"], "down", 1.5, "small", "#4caf50"),
    new Car(300, -300, ["right", "down"], "down", 1.9, "small", "#4caf50"),
    new Car(450, -500, ["right", "down"], "down", 2.3, "small", "#4caf50"),

    new Car(-150, 150, ["down", "right"], "right", 1.1, "small", "#ffeb3b"),
    new Car(-350, 300, ["down", "right"], "right", 1.6, "small", "#ffeb3b"),
    new Car(-550, 450, ["down", "right"], "right", 2.1, "small", "#ffeb3b"),

    new Car(150, -150, ["right", "down"], "down", 1.3, "small", "#ffeb3b"),
    new Car(300, -350, ["right", "down"], "down", 1.7, "small", "#ffeb3b"),
    new Car(450, -550, ["right", "down"], "down", 2.1, "small", "#ffeb3b"),

    new Car(-700, 150, ["down", "right", "down", "right"], "right", 1.4, "small", "#4caf50"),
    new Car(-900, 300, ["right", "down", "right", "down"], "right", 1.9, "small", "#4caf50"),
    new Car(-1100, 450, ["down", "right", "down", "right"], "right", 2.3, "small", "#4caf50"),

    new Car(-600, 150, ["down", "right", "down", "right"], "right", 1.2),
    new Car(-800, 300, ["right", "down", "right", "down"], "right", 1.7),
  ];
const engine = new SimulationEngine(cars, () => {
      mapRenderer.render();
      carRenderer.render(cars);
    }, map.intersections);

    engine.start();

    return () => {
      engine.pause();
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
}
