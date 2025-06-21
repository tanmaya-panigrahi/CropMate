import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, History, Bot, Leaf, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";

export default function Overview() {
  const { user } = useAuth();
  const name = user?.displayName?.split(" ")[0] || "Farmer";

  const [stats, setStats] = useState({
    diagnoses: 0,
    cropsSaved: 0,
    history: 0,
    chatbotUses: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  const tips = [
  "Avoid watering at noon to prevent fungal growth.",
  "Inspect leaves weekly for early signs of disease.",
  "Use crop rotation to improve soil health.",
  "Add compost or organic manure to enrich soil fertility.",
  "Remove weeds regularly to reduce pest habitats.",
  "Water early in the morning or late evening for better absorption.",
  "Use mulch to retain moisture and regulate soil temperature.",
  "Choose disease-resistant crop varieties when possible.",
  "Clean tools regularly to prevent disease spread.",
  "Avoid over-fertilizing, as it can harm plants and the environment."
];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = await user.getIdToken();
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch stats
        const statsRes = await axios.get( `${import.meta.env.VITE_API_URL}/api/dashboard/summary`, { headers });
        setStats(statsRes.data);

        // Fetch recent activity
        const recentRes = await axios.get( `${import.meta.env.VITE_API_URL}/api/dashboard/recent`, { headers });
        setRecentActivity(recentRes.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    if (user) fetchDashboardData();
  }, [user]);

  const statsDisplay = [
    { icon: LayoutDashboard, title: "Diagnoses", value: stats.diagnoses },
    { icon: Leaf, title: "Diseases", value: stats.uniqueDiseaseSaved },
    { icon: History, title: "History Entries", value: stats.history },
    { icon: Bot, title: "ChatBot Uses", value: stats.chatbotUses },
  ];

  return (
    <div className="p-6 md:p-10 min-h-screen pb-[100px] text-primary">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold">👋 Welcome back, {name}</h1>
        <p className="text-xl text-[#628B35] mt-3">
          📅 Today, {format(new Date(), "MMMM dd, yyyy")}
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {statsDisplay.map((stat) => (
          <Card
            key={stat.title}
            className="bg-white border border-primary shadow-md rounded-2xl hover:shadow-xl transition duration-300"
          >
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center gap-4">
                <stat.icon className="w-8 h-8" />
                <div>
                  <p className="text-sm font-medium uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">🕓 Recent Diagnoses</h2>
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border">
          {recentActivity.length === 0 ? (
            <p className="text-muted-foreground italic">No recent diagnoses found.</p>
          ) : (
            recentActivity.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:justify-between text-lg gap-2 md:gap-0 border-b last:border-b-0 pb-4 md:pb-0"
              >
                <span>🌾 <span className="font-semibold">{item.disease}</span></span>
                <span className="text-gray-800">{item.description.length==0?`No description`:item.description}</span>
                <span className="text-sm text-gray-500">
                  {format(new Date(item.createdAt), "MMMM d, yyyy")}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">🚀 Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[ 
            { label: "📸 Diagnose", to: "/dashboard/diagnose" },
            { label: "📜 History", to: "/dashboard/history" },
            { label: "🤖 ChatBot", to: "/dashboard/chatbot" },
            { label: "🌱 Crops", to: "/dashboard/crops" },
          ].map((action) => (
            <Button
              key={action.to}
              asChild
              className="w-full border border-primary text-primary hover:bg-[#628B35] hover:text-white transition duration-300"
              variant="outline"
            >
              <Link to={action.to}>{action.label}</Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Tip of the Day */}
      <div className="bg-[#E2DBD0] p-8 rounded-xl mb-16 shadow-inner">
        <h3 className="text-2xl font-semibold mb-2">🌟 Tip of the Day</h3>
        <p className="italic text-lg">{randomTip}</p>
      </div>

      {/* Learn More Section */}
      <div className="bg-white border p-8 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
        <div>
          <h3 className="text-2xl font-semibold mb-1">Learn more about CropMate</h3>
          <p className="text-base text-gray-700">
            Discover features, FAQs, and more
          </p>
        </div>
        <Button
          variant="outline"
          asChild
          className="border-primary bg-secondary hover:bg-background text-white hover:text-black transition duration-300"
        >
          <Link to="/dashboard/about" className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            About
          </Link>
        </Button>
      </div>
    </div>
  );
}
