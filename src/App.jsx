import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 animate-pulse">
            Cohorsil App v0.1.22 (Tauri v2 Keys) 🔑
          </h1>
          <p className="text-gray-300 text-lg">
            Build amazing desktop applications with modern web technologies
          </p>
        </div>

        {/* Logos */}
        <div className="flex justify-center items-center gap-8 mb-12">
          <a
            href="https://vite.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform duration-300"
          >
            <img
              src="/vite.svg"
              className="h-24 w-24 drop-shadow-2xl hover:drop-shadow-[0_0_2rem_#646cffaa]"
              alt="Vite logo"
            />
          </a>
          <a
            href="https://tauri.app"
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform duration-300"
          >
            <img
              src="/tauri.svg"
              className="h-24 w-24 drop-shadow-2xl hover:drop-shadow-[0_0_2rem_#24c8dbaa]"
              alt="Tauri logo"
            />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform duration-300"
          >
            <img
              src={reactLogo}
              className="h-24 w-24 drop-shadow-2xl hover:drop-shadow-[0_0_2rem_#61dafbaa] animate-spin-slow"
              alt="React logo"
            />
          </a>
        </div>

        {/* Card with Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
            <p className="text-gray-300 text-center mb-6">
              Click on the logos to learn more
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                greet();
              }}
              className="space-y-4"
            >
              <div>
                <input
                  id="greet-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Greet
              </button>
            </form>

            {greetMsg && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg animate-fade-in">
                <p className="text-green-300 text-center font-medium">
                  {greetMsg}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Built with ❤️ using Tauri, React, Vite & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
