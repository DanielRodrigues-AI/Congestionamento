import { GridMap } from "../maps/GridMap";

export class MapRenderer {
    constructor(
        private ctx: CanvasRenderingContext2D,
        private map: GridMap
    ) {}

    render(): void {
        this.clear();
        this.drawRoads();
        this.drawIntersections();
    }

    private clear(): void {
        this.ctx.clearRect(0, 0, 800, 600);
    }

    private drawRoads(): void {
        this.ctx.strokeStyle = "#444";
        this.ctx.lineWidth = 40;

        this.map.roads.forEach(road => {
            this.ctx.beginPath();
            this.ctx.moveTo(road.start.x, road.start.y);
            this.ctx.lineTo(road.end.x, road.end.y);
            this.ctx.stroke();
        });
    }

    private drawIntersections(): void {
        this.ctx.fillStyle = "#666";

        this.map.intersections.forEach(intersection => {
            this.ctx.fillRect(
                intersection.position.x - 20,
                intersection.position.y - 20,
                40,
                40
            );
        });
    }
}