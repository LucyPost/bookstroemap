import CustomMap from "./ui/custom-map";
import HexagonalBar from "./ui/hexagonal-bar";
import MainMap from "./ui/main-map";

export default function Home() {

  return (
    <main className="flex min-h-max justify-center items-center">
      <div className="flex flex-col items-center w-15/16 md:w-9/12 bg-white rounded-lg shadow-lg">
        <MainMap />
      </div>
    </main>
  );
}
