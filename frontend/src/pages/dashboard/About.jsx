/* eslint-disable no-unused-vars */
// src/pages/About.jsx
import {
  ImageIcon,
  Search,
  Bot,
  Sparkles,
  Github,
  Instagram,
} from "lucide-react";
import Faq from "@/components/Faq";

const howItWorks = [
  {
    step: "1",
    title: "Capture Crop Image",
    desc: "Upload or snap a clear photo of the affected crop right in the app.",
  },
  {
    step: "2",
    title: "AI Diagnosis",
    desc: "Our vision model detects the disease and GPT explains the cause.",
  },
  {
    step: "3",
    title: "Actionable Insights",
    desc: "Get tailored cure steps and an estimated recovery timeline instantly.",
  },
];

const features = [
  {
    icon: ImageIcon,
    title: "Image Diagnosis",
    desc: "Detect plant diseases from photos in seconds.",
  },
  {
    icon: Search,
    title: "History Access",
    desc: "Review past diagnoses for trend analysis.",
  },
  {
    icon: Bot,
    title: "AI Chat Assistant",
    desc: "Ask farming questions anytime, anywhere.",
  },
  {
    icon: Sparkles,
    title: "Instant Suggestions",
    desc: "Receive real-time, personalized crop tips.",
  },
];

export default function About() {
  return (
    <div className=" text-primary md:pb-2 pb-24">

      {/* Hero */}
      <section className="px-4 py-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          About <span className="text-secondary">CropMate</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
          Empowering farmers with AI-driven insights for healthier crops and sustainable yields.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-12 space-y-6">
        <h2 className="text-3xl font-bold">🌱 Our Mission & Vision</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          CropMate strives to make advanced crop-health knowledge accessible to every farmer.
          We envision a world where technology bridges the gap between agronomy expertise and daily farm practice.
        </p>
      </section>

      {/* Problem */}
      <section className="container mx-auto px-4 py-12 space-y-6">
        <h2 className="text-3xl font-bold">🔍 The Problem We Solve</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Delayed disease identification can devastate yields. Limited access to trusted advice
          further compounds the issue. CropMate brings rapid, reliable diagnosis and guidance
          right to the farmer’s phone.
        </p>
      </section>

      {/* AI at the Core */}
      <section className="container mx-auto px-4 py-12 space-y-6">
        <h2 className="text-3xl font-bold">🧠 AI at the Core</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          We blend state-of-the-art vision models with GPT reasoning to deliver precise diagnoses
          and treatment plans, continually learning from new data to serve farmers better every day.
        </p>
      </section>

      {/* How it Works */}
      <section className="bg-card py-20 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">🚀 How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map(({ step, title, desc }) => (
              <div
                key={step}
                className="bg-white border-l-4 border-[#628B35] rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <span className="block text-4xl font-bold text-[#628B35]">
                  {step}
                </span>
                <h3 className="mt-4 mb-2 text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">✨ Key Features</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="feature-card bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md transition"
            >
              <Icon className="w-7 h-7 text-[#628B35] mb-3" />
              <h4 className="text-lg font-semibold mb-1">{title}</h4>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="container mx-auto px-4">

        <Faq />
      </section>

      {/* Developer */}
      <section className="bg-card rounded-lg py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">👋 Meet the Developer</h2>
        <p className="text-lg max-w-xl mx-auto mb-6 text-muted-foreground">
          Hi, I’m <span className="font-semibold text-[#103713]">Tanmaya Panigrahi</span> — a
          tech enthusiast on a mission to simplify agriculture through AI.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/tanmaya-panigrahi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium transition hover:bg-[#4e6f2c]"
          >
            <Github className="h-5 w-5" /> GitHub
          </a>
          <a
            href="https://www.instagram.com/_tanmay_021_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium transition hover:bg-[#4e6f2c]"
          >
            <Instagram className="h-5 w-5" /> Instagram
          </a>
        </div>

      </section>
    </div>
  );
}
