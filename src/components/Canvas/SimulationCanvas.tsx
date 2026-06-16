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
    new Car(450, -400, ["right", "down"], "down", 2)
];
    const engine = new SimulationEngine(cars, () => {
      mapRenderer.render();
      carRenderer.render(cars);
    });

    engine.start();

    return () => {
      engine.pause();
    };
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
}
