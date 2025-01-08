import Layout from "./components/Layout";
import Chat from "./components/Chat";
import VisualizationSection from "./components/VisualizationSection";

export default function App() {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-1/3 p-4">
          <Chat />
        </div>
        <div className="w-full lg:w-2/3 p-4">
          <VisualizationSection />
        </div>
      </div>
    </Layout>
  );
}
