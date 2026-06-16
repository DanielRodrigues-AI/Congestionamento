import { SimulationCanvas } from "../components/Canvas/SimulationCanvas";

export function Home() {
    return (
        <main className="home-page">
            <h1>Congestionamento</h1>

            <SimulationCanvas />
        </main>
    );
}