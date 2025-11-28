import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SEO } from "./components/SEO";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 👆 Full page layout */}

      <SEO />

      {/* Navbar Section */}
      <Navbar />

      <main className="pt-20 flex-1 w-full" role="main">
        {/* 👇 This wrapper is the FIX */}
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <Routes>
            <Route
              path="/"
              element={
                <section
                  id="home"
                  aria-labelledby="home-heading"
                  className="w-full"
                >
                  <h1 id="home-heading" className="text-3xl font-bold">
                    Home
                  </h1>

                  <p className="text-(--color-text-primary)">
                    Explore Jerry's expertise in Java, Spring Boot,
                    microservices, and scalable backend architecture.
                  </p>
                </section>
              }
            />

            <Route
              path="/about"
              element={
                <section
                  id="about"
                  aria-labelledby="about-heading"
                  className="w-full"
                >
                  <h1 id="about-heading" className="text-3xl font-bold">
                    About
                  </h1>

                  <p className="text-(--color-text-primary)">
                    Learn more about Jerry’s background and projects.
                  </p>
                </section>
              }
            />
          </Routes>
        </div>
      </main>

      {/* Footer Section */}
      <Footer />

<ToastContainer
  toastClassName="custom-toast"
  progressClassName="custom-progress-bar"
  position="top-right"
  autoClose={1000}
  hideProgressBar={false}
  closeOnClick
/>
    </div>
  );
}

export default App;
