import { Intersection } from "./Intersection";
import { Road } from "./Road";

export class GridMap {
    roads: Road[] = [];
    intersections: Intersection[] = [];

    constructor() {
        this.generate();
    }

    private generate(): void {
        const positions = [150, 300, 450];

        positions.forEach(position => {
            this.roads.push(
                new Road(
                    { x: 50, y: position },
                    { x: 750, y: position },
                    "horizontal"
                )
            );

            this.roads.push(
                new Road(
                    { x: position, y: 50 },
                    { x: position, y: 550 },
                    "vertical"
                )
            );
        });

        positions.forEach(x => {
            positions.forEach(y => {
                this.intersections.push(
                    new Intersection({ x, y })
                );
            });
        });
    }
}