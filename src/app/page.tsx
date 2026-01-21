"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  X,
  Loader2,
  Upload,
  Pill,
  FileText,
  ClipboardList,
  Sparkles,
  MessageCircle,
  Plus,
  History,
  Menu,
  Brain,
  Heart,
  Eye,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";

interface ChatMessage {
  role: "user" | "model";
  parts: Array<{
    text?: string;
    inlineData?: { mimeType: string; data: string };
  }>;
}

interface DisplayMessage {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  preview: string;
}

const MedicalBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-950 to-blue-950" />
      
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2338bdf8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="pillGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="pillGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <linearGradient id="pillGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="pillGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
          <linearGradient id="pillGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g className="animate-float" style={{ animationDuration: "8s" }}>
          <rect x="80" y="100" width="140" height="55" rx="27.5" fill="url(#pillGrad1)" filter="url(#glow)" transform="rotate(-20 150 127)" opacity="0.9" />
          <rect x="80" y="100" width="70" height="55" rx="27.5" fill="#38bdf8" filter="url(#glow)" transform="rotate(-20 150 127)" opacity="0.7" />
          <ellipse cx="115" cy="115" rx="8" ry="4" fill="white" opacity="0.4" transform="rotate(-20 115 115)" />
        </g>

        <g className="animate-float-reverse" style={{ animationDuration: "10s", animationDelay: "0.5s" }}>
          <rect x="950" y="80" width="160" height="60" rx="30" fill="url(#pillGrad2)" filter="url(#glow)" transform="rotate(-35 1030 110)" opacity="0.85" />
          <rect x="950" y="80" width="80" height="60" rx="30" fill="#fb7185" filter="url(#glow)" transform="rotate(-35 1030 110)" opacity="0.6" />
          <ellipse cx="990" cy="95" rx="10" ry="5" fill="white" opacity="0.35" transform="rotate(-35 990 95)" />
        </g>

        <g className="animate-float-slow" style={{ animationDuration: "12s", animationDelay: "1s" }}>
          <rect x="200" y="500" width="130" height="50" rx="25" fill="url(#pillGrad3)" filter="url(#glow)" transform="rotate(15 265 525)" opacity="0.9" />
          <rect x="200" y="500" width="65" height="50" rx="25" fill="#4ade80" filter="url(#glow)" transform="rotate(15 265 525)" opacity="0.65" />
          <ellipse cx="230" cy="510" rx="7" ry="3.5" fill="white" opacity="0.4" transform="rotate(15 230 510)" />
        </g>

        <g className="animate-float" style={{ animationDuration: "9s", animationDelay: "1.5s" }}>
          <rect x="1000" y="450" width="120" height="45" rx="22.5" fill="url(#pillGrad4)" filter="url(#glow)" transform="rotate(-25 1060 472)" opacity="0.85" />
          <rect x="1000" y="450" width="60" height="45" rx="22.5" fill="#c084fc" filter="url(#glow)" transform="rotate(-25 1060 472)" opacity="0.6" />
          <ellipse cx="1030" cy="460" rx="6" ry="3" fill="white" opacity="0.35" transform="rotate(-25 1030 460)" />
        </g>

        <g className="animate-float-reverse" style={{ animationDuration: "11s", animationDelay: "2s" }}>
          <rect x="50" y="350" width="110" height="42" rx="21" fill="url(#pillGrad5)" filter="url(#glow)" transform="rotate(30 105 371)" opacity="0.9" />
          <rect x="50" y="350" width="55" height="42" rx="21" fill="#fbbf24" filter="url(#glow)" transform="rotate(30 105 371)" opacity="0.65" />
          <ellipse cx="80" cy="358" rx="6" ry="3" fill="white" opacity="0.4" transform="rotate(30 80 358)" />
        </g>

        <g className="animate-float-slow" style={{ animationDuration: "14s", animationDelay: "2.5s" }}>
          <rect x="850" y="280" width="100" height="38" rx="19" fill="url(#pillGrad1)" filter="url(#glow)" transform="rotate(-15 900 299)" opacity="0.8" />
          <rect x="850" y="280" width="50" height="38" rx="19" fill="#7dd3fc" filter="url(#glow)" transform="rotate(-15 900 299)" opacity="0.55" />
        </g>

        <g className="animate-float" style={{ animationDuration: "10s", animationDelay: "3s" }}>
          <rect x="300" y="200" width="90" height="35" rx="17.5" fill="url(#pillGrad2)" filter="url(#glow)" transform="rotate(25 345 217)" opacity="0.75" />
          <rect x="300" y="200" width="45" height="35" rx="17.5" fill="#fda4af" filter="url(#glow)" transform="rotate(25 345 217)" opacity="0.5" />
        </g>

        <g className="animate-float-reverse" style={{ animationDuration: "13s", animationDelay: "3.5s" }}>
          <rect x="700" y="600" width="150" height="55" rx="27.5" fill="url(#pillGrad3)" filter="url(#glow)" transform="rotate(-40 775 627)" opacity="0.85" />
          <rect x="700" y="600" width="75" height="55" rx="27.5" fill="#86efac" filter="url(#glow)" transform="rotate(-40 775 627)" opacity="0.6" />
        </g>

        <g className="animate-pulse-soft" style={{ animationDuration: "4s" }}>
          <circle cx="180" cy="650" r="6" fill="#0ea5e9" filter="url(#softGlow)" opacity="0.8" />
          <circle cx="400" cy="100" r="5" fill="#f43f5e" filter="url(#softGlow)" opacity="0.7" />
          <circle cx="600" cy="700" r="7" fill="#22c55e" filter="url(#softGlow)" opacity="0.75" />
          <circle cx="1100" cy="200" r="5" fill="#a855f7" filter="url(#softGlow)" opacity="0.7" />
          <circle cx="750" cy="150" r="6" fill="#f59e0b" filter="url(#softGlow)" opacity="0.75" />
        </g>

        <g className="animate-pulse-soft" style={{ animationDuration: "5s", animationDelay: "1s" }}>
          <circle cx="100" cy="200" r="4" fill="#67e8f9" filter="url(#softGlow)" opacity="0.6" />
          <circle cx="500" cy="400" r="5" fill="#fb7185" filter="url(#softGlow)" opacity="0.65" />
          <circle cx="900" cy="550" r="6" fill="#4ade80" filter="url(#softGlow)" opacity="0.7" />
          <circle cx="350" cy="650" r="4" fill="#c084fc" filter="url(#softGlow)" opacity="0.6" />
        </g>

        <g opacity="0.15">
          <path d="M50 400 L80 400 L80 370 L110 370 L110 400 L140 400 L140 430 L110 430 L110 460 L80 460 L80 430 L50 430 Z" fill="#38bdf8" className="animate-pulse-soft" style={{ animationDuration: "3s" }} />
          <path d="M1050 600 L1070 600 L1070 580 L1090 580 L1090 600 L1110 600 L1110 620 L1090 620 L1090 640 L1070 640 L1070 620 L1050 620 Z" fill="#fb7185" className="animate-pulse-soft" style={{ animationDuration: "4s", animationDelay: "1s" }} />
          <path d="M600 50 L620 50 L620 30 L640 30 L640 50 L660 50 L660 70 L640 70 L640 90 L620 90 L620 70 L600 70 Z" fill="#4ade80" className="animate-pulse-soft" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }} />
        </g>

        <g opacity="0.1">
          <circle cx="300" cy="300" r="80" stroke="#38bdf8" strokeWidth="1" fill="none" className="animate-spin-slow" style={{ transformOrigin: "300px 300px" }} />
          <circle cx="900" cy="400" r="60" stroke="#fb7185" strokeWidth="1" fill="none" className="animate-spin-slow-reverse" style={{ transformOrigin: "900px 400px" }} />
        </g>
      </svg>

      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-sky-500/20 to-blue-600/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/15 to-teal-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-500/10 to-purple-600/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
    </div>
  );
};

export default function Home() {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "ai" | "history">("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<HistoryItem[]>([
    { id: "1", title: "Paracetamol Analysis", date: "Today", preview: "500mg tablet identification and usage guidelines..." },
    { id: "2", title: "Blood Test Report", date: "Yesterday", preview: "Complete blood count results showing normal ranges..." },
    { id: "3", title: "Prescription Review", date: "Jan 18", preview: "Dr. Smith prescription for antibiotics course..." },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setImagePreview(url);
    }
  };

  const removeImage = () => {
    setFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyzeImage = async () => {
    if (!file) return;

    const userMessage: DisplayMessage = {
      role: "user",
      content: "Please analyze this medical image",
      image: imagePreview || undefined,
    };

    setMessages([userMessage]);
    setIsLoading(true);
    setHasUploadedImage(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("prompt", "Please analyze this medical image. Identify what it shows (medicine, prescription, report, etc.), explain what it contains, its general use, and any basic precautions. Keep the explanation simple and easy to understand.");
    formData.append("history", JSON.stringify([]));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Error: ${data.error}`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.text,
          },
        ]);
        setChatHistory(data.history);
        
        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          title: "New Analysis",
          date: "Just now",
          preview: data.text.substring(0, 50) + "...",
        };
        setAnalysisHistory((prev) => [newHistoryItem, ...prev]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setFile(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const sendFollowUp = async () => {
    if (!input.trim()) return;

    const userMessage: DisplayMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("prompt", input);
    formData.append("history", JSON.stringify(chatHistory));

    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Error: ${data.error}`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.text,
          },
        ]);
        setChatHistory(data.history);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendFollowUp();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setChatHistory([]);
    setHasUploadedImage(false);
    setFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatMessage = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={i} className="font-semibold text-white mt-4 mb-2 text-sm sm:text-base">
            {line.slice(2, -2)}
          </p>
        );
      }
      if (line.match(/^\*\*[^*]+\*\*$/)) {
        const text = line.replace(/\*\*/g, "");
        return (
          <p key={i} className="font-semibold text-white mt-4 mb-2 text-sm sm:text-base">
            {text}
          </p>
        );
      }
      if (line.startsWith("- ") || line.startsWith("• ")) {
        return (
          <li key={i} className="ml-5 text-slate-300 leading-relaxed list-disc text-sm sm:text-base">
            {line.slice(2)}
          </li>
        );
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={i} className="ml-5 text-slate-300 leading-relaxed list-decimal text-sm sm:text-base">
            {line.replace(/^\d+\.\s*/, "")}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={i} className="h-2" />;
      }
      if (line.trim() === "---") {
        return <hr key={i} className="my-4 border-slate-700" />;
      }
      return (
        <p key={i} className="text-slate-300 leading-relaxed text-sm sm:text-base">
          {line}
        </p>
      );
    });
  };

  const navItems = [
    { id: "home" as const, icon: Heart, label: "Home" },
    { id: "ai" as const, icon: Brain, label: "AI Analysis" },
    { id: "history" as const, icon: History, label: "History" },
  ];

  const features = [
    { icon: Pill, title: "Medicine Analysis", desc: "Identify tablets, capsules, and understand their uses" },
    { icon: FileText, title: "Prescription Reader", desc: "Decode doctor's prescriptions with ease" },
    { icon: ClipboardList, title: "Lab Report Insights", desc: "Understand your medical test results" },
    { icon: Shield, title: "Drug Interactions", desc: "Check potential medication conflicts" },
  ];

  return (
    <div className="min-h-screen flex bg-slate-900 relative overflow-hidden">
      <MedicalBackground />
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:relative
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        w-72 lg:w-72
        bg-slate-900/95 lg:bg-slate-900/80 
        backdrop-blur-2xl 
        border-r border-white/10 
        flex flex-col 
        transition-transform duration-300 
        z-50 lg:z-20
        h-full
      `}>
        <div className="p-4 sm:p-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30 animate-pulse-soft">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white">
                  MediCare AI
                </h1>
                <p className="text-[10px] sm:text-[11px] text-sky-400 font-medium tracking-wider uppercase">Medical Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-3 sm:p-4 space-y-2 overflow-y-auto">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl transition-all duration-300 touch-manipulation ${
                activeTab === id
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${activeTab === id ? "animate-pulse" : ""}`} />
              <span className="font-medium text-sm sm:text-base">{label}</span>
            </button>
          ))}
        </nav>

        <div className="p-3 sm:p-4 border-t border-white/10">
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all touch-manipulation"
          >
            <X className="w-5 h-5" />
            <span className="text-sm font-medium">Close Menu</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 relative z-10 overflow-auto">
        {/* Mobile Header - Hamburger Menu */}
        <div className="lg:hidden sticky top-0 z-30 bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors touch-manipulation"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-white">MediCare AI</span>
            </div>
            <div className="w-10" />
          </div>
        </div>

        {activeTab === "home" && (
          <div className="min-h-screen flex flex-col">
            {/* Desktop Header */}
            <header className="hidden lg:block px-4 sm:px-8 py-4 sm:py-6">
              <nav className="flex items-center justify-between max-w-6xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-white">MediCare AI</span>
                </div>
                <Button 
                  onClick={() => setActiveTab("ai")}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl px-4 sm:px-6 shadow-lg shadow-sky-500/30 text-sm sm:text-base touch-manipulation"
                >
                  Try AI Analysis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </nav>
            </header>

            <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-8 sm:py-12">
              <div className="max-w-6xl mx-auto text-center w-full">
                <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-sky-500/10 border border-sky-500/20 rounded-full">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-sky-400" />
                  <span className="text-xs sm:text-sm text-sky-300 font-medium">Powered by Advanced AI</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4">
                  Your Personal
                  <span className="block bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Medical AI Assistant
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4">
                  Upload images of medicines, prescriptions, or lab reports and get instant AI-powered analysis. 
                  Understanding your health has never been easier.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
                  <Button 
                    onClick={() => setActiveTab("ai")}
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-xl shadow-sky-500/30 transition-all hover:scale-105 touch-manipulation min-h-[44px]"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Start AI Analysis
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("history")}
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 rounded-xl px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg transition-all touch-manipulation min-h-[44px]"
                  >
                    <History className="w-5 h-5 mr-2" />
                    View History
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4">
                  {features.map(({ icon: Icon, title, desc }) => (
                    <div 
                      key={title} 
                      className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-sky-500/30 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:from-sky-500/30 group-hover:to-blue-600/30 transition-all">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-sky-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{title}</h3>
                      <p className="text-xs sm:text-sm text-slate-400">{desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-slate-500 px-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    <span className="text-sm sm:text-base">Free to use</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    <span className="text-sm sm:text-base">No sign-up required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    <span className="text-sm sm:text-base">Instant results</span>
                  </div>
                </div>

                <div className="mt-8 sm:mt-12 p-3 sm:p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl max-w-2xl mx-auto">
                  <p className="text-xs sm:text-sm text-amber-300 px-2">
                    <span className="font-semibold">Disclaimer:</span> This tool provides information for educational purposes only. 
                    Always consult a qualified healthcare professional for medical advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "ai" && (
          <>
            <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between max-w-5xl mx-auto">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
                    AI Analysis
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">Upload medical images for instant AI analysis</p>
                </div>
                {hasUploadedImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={startNewChat}
                    className="border-white/20 text-white hover:bg-white/10 rounded-xl gap-2 text-xs sm:text-sm touch-manipulation min-h-[44px] px-3 sm:px-4"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">New Analysis</span>
                    <span className="sm:hidden">New</span>
                  </Button>
                )}
              </div>
            </header>

            <div className="p-4 sm:p-6 max-w-5xl mx-auto">
              {!hasUploadedImage ? (
                <div className="space-y-6 sm:space-y-8">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-8 border border-white/10">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    {!imagePreview ? (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-white/20 rounded-2xl p-8 sm:p-16 hover:border-sky-400/50 hover:bg-sky-500/5 transition-all group touch-manipulation"
                      >
                        <div className="flex flex-col items-center gap-4 sm:gap-5">
                          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 flex items-center justify-center group-hover:from-sky-500/30 group-hover:to-blue-600/30 transition-all animate-pulse-soft">
                            <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-sky-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white text-base sm:text-xl">Click to upload medical image</p>
                            <p className="text-xs sm:text-sm text-slate-400 mt-1 sm:mt-2">Supports JPG, PNG, GIF up to 10MB</p>
                          </div>
                        </div>
                      </button>
                    ) : (
                      <div className="space-y-4 sm:space-y-5">
                        <div className="relative rounded-2xl overflow-hidden bg-slate-800/50 flex items-center justify-center p-4">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            width={400}
                            height={300}
                            className="object-contain max-h-48 sm:max-h-72 rounded-xl w-full"
                          />
                          <button
                            onClick={removeImage}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg touch-manipulation"
                          >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>
                        </div>
                        <Button
                          onClick={analyzeImage}
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-5 sm:py-7 text-base sm:text-lg font-semibold rounded-xl shadow-lg shadow-sky-500/30 transition-all touch-manipulation min-h-[44px]"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 animate-spin" />
                              Analyzing Image...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                              Analyze with AI
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {[
                      { icon: Pill, label: "Medicines", desc: "Tablets & Capsules", color: "from-sky-500 to-blue-500" },
                      { icon: FileText, label: "Prescriptions", desc: "Doctor Orders", color: "from-rose-500 to-pink-500" },
                      { icon: ClipboardList, label: "Lab Reports", desc: "Test Results", color: "from-violet-500 to-purple-500" },
                    ].map(({ icon: Icon, label, desc, color }) => (
                      <div key={label} className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-5 text-center border border-white/10 hover:border-sky-500/30 transition-all cursor-default group">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <p className="font-semibold text-white text-sm sm:text-base">{label}</p>
                        <p className="text-xs text-slate-400 mt-1">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <div
                    ref={scrollAreaRef}
                    className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 min-h-[400px] sm:min-h-[450px] max-h-[55vh] sm:max-h-[65vh] overflow-y-auto border border-white/10"
                  >
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`mb-4 sm:mb-5 animate-fade-in ${
                          msg.role === "user" ? "flex justify-end" : "flex justify-start"
                        }`}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mr-2 sm:mr-3 shadow-lg shrink-0">
                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 sm:px-5 sm:py-4 ${
                            msg.role === "user"
                              ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30"
                              : "bg-slate-800/80 text-slate-200 border border-white/10"
                          }`}
                        >
                          {msg.image && (
                            <div className="mb-3 sm:mb-4 rounded-xl overflow-hidden">
                              <Image
                                src={msg.image}
                                alt="Uploaded"
                                width={280}
                                height={200}
                                className="object-contain w-full"
                              />
                            </div>
                          )}
                          <div className="text-sm sm:text-base">
                            {msg.role === "user" ? (
                              <p className="font-medium">{msg.content}</p>
                            ) : (
                              formatMessage(msg.content)
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start mb-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mr-2 sm:mr-3 shadow-lg">
                          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div className="bg-slate-800/80 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 border border-white/10">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-sky-500 rounded-full animate-typing-1" />
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-sky-500 rounded-full animate-typing-2" />
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-sky-500 rounded-full animate-typing-3" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white/5 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-white/10">
                    <div className="flex items-end gap-2 sm:gap-3">
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask a follow-up question..."
                        className="min-h-[44px] sm:min-h-[50px] max-h-28 resize-none border-0 bg-transparent focus-visible:ring-0 text-sm sm:text-base text-white placeholder:text-slate-500"
                        rows={1}
                      />
                      <Button
                        onClick={sendFollowUp}
                        disabled={isLoading || !input.trim()}
                        size="icon"
                        className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-500/30 disabled:opacity-50 transition-all touch-manipulation"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "history" && (
          <>
            <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between max-w-5xl mx-auto">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <History className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
                    Analysis History
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">Browse your previous medical analyses</p>
                </div>
              </div>
            </header>

            <div className="p-4 sm:p-6 max-w-5xl mx-auto">
              {analysisHistory.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 sm:p-12 border border-white/10 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <History className="w-6 h-6 sm:w-8 sm:h-8 text-slate-500" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">No History Yet</h3>
                  <p className="text-sm sm:text-base text-slate-400 mb-4">Your analysis history will appear here</p>
                  <Button 
                    onClick={() => setActiveTab("ai")} 
                    className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl touch-manipulation min-h-[44px]"
                  >
                    Start First Analysis
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {analysisHistory.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-5 border border-white/10 hover:border-sky-500/30 transition-all group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-start gap-3 sm:gap-4 flex-1">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 flex items-center justify-center group-hover:from-sky-500/30 group-hover:to-blue-600/30 transition-colors shrink-0">
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white text-sm sm:text-base">{item.title}</h4>
                            <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-2">{item.preview}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-13 sm:pl-0">
                          <span className="text-xs text-slate-500 font-medium">{item.date}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedHistory(item)}
                            className="border-white/20 text-white hover:bg-white/10 rounded-lg text-xs sm:text-sm touch-manipulation min-h-[36px] px-3"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedHistory && (
                <div 
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
                  onClick={() => setSelectedHistory(null)}
                >
                  <div 
                    className="bg-slate-900 rounded-2xl p-5 sm:p-6 max-w-2xl w-full border border-white/10 max-h-[80vh] overflow-auto" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white pr-4">{selectedHistory.title}</h3>
                      <button 
                        onClick={() => setSelectedHistory(null)} 
                        className="text-slate-400 hover:text-white p-2 -m-2 touch-manipulation"
                      >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </div>
                    <p className="text-sm sm:text-base text-slate-300">{selectedHistory.preview}</p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-4">Analyzed: {selectedHistory.date}</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
