import TheHeader from "./components/TheHeader";
import TheSidebar from "./components/TheSidebar";
import TheList from "./components/TheList";
import { ReposProvider } from "./context/ReposContext";

export default function App() {
  return (
    <>
      <TheHeader />
      <section className="flex flex-col lg:flex-row lg:divide-x divide-gray-800 max-w-screen-md lg:max-w-screen-lg mx-auto">
        <ReposProvider>
          <TheSidebar />
          <TheList />
        </ReposProvider>
      </section>
    </>
  );
}
