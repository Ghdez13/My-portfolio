import { Navbar } from "./components/Navbar";
import { SEO } from "./components/SEO";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <SEO />
      <Navbar />
      <main className="pt-20" role="main">
        <section id="home" aria-labelledby="home-heading">
          <h1 id="home-heading" className="text-3xl font-bold">
            Home
          </h1>
          <p>
            Explore Jerry's expertise in Java, Spring Boot, microservices, and
            scalable backend architecture.
          </p>
        </section>
        {/* Add other sections here */}
      </main>
      <ToastContainer position="top-right" autoClose={800} />
    </>
  );
}

export default App;
