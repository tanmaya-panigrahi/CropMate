// src/pages/Crops.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function Crops() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await axios.get( `${import.meta.env.VITE_API_URL}/api/crops`);
        setCrops(res.data);
      } catch (err) {
        console.error("Failed to load crops:", err);
      }
    };
    fetchCrops();
  }, []);

  const categories = ["All", ...Array.from(new Set(crops.map(c => c.category)))];

  const filteredCrops = crops.filter(crop => {
    const matchesCategory = activeCategory === "All" || crop.category === activeCategory;
    const matchesSearch = crop.cropName.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCrops.length / ITEMS_PER_PAGE);
  const paginatedCrops = filteredCrops.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Reset to page 1 if category or search changes
  useEffect(() => {
    setPage(1);
  }, [search, activeCategory]);

  return (
    <div className="p-4 md:p-6 lg:p-10 pb-24 md:pb-2">
      <h1 className="text-2xl font-semibold mb-6 text-[#103713]">CropMate Learning</h1>

      {/* Search + Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:mb-8 mb-14">
        <Input
          type="text"
          placeholder="Search crop name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="bg-muted rounded-lg p-1 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="text-sm whitespace-nowrap" 
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Crops Grid */}
      {filteredCrops.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <img
            src="/no-data.svg"
            alt="No data"
            className="w-40 h-40 mb-6 opacity-70"
          />
          <p className="text-lg font-medium">No crops found</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {paginatedCrops.map((crop) => (
              <Card
                key={crop._id}
                className="shadow hover:shadow-lg transition flex flex-col justify-between h-full"
              >
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="space-y-1 mb-4">
                    <h2 className="text-lg font-semibold text-[#103713]">{crop.cropName}</h2>
                    <p className="text-xs text-muted-foreground italic">{crop.scientificName}</p>
                    <p className="text-sm"><strong>Category:</strong> {crop.category}</p>
                    <p className="text-sm"><strong>Climate:</strong> {crop.climate}</p>
                    <p className="text-sm"><strong>Soil:</strong> {crop.soilType}</p>
                    <p className="text-sm"><strong>Watering:</strong> {crop.watering}</p>
                  </div>

                  <div className="mt-auto">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-primary text-background hover:bg-green-800 w-full"
                          onClick={() => setSelectedCrop(crop)}
                        >
                          View Tips
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="text-[#103713]">
                            {selectedCrop?.cropName} Tips
                          </DialogTitle>
                          <DialogDescription className="text-sm text-muted-foreground">
                            Helpful info to grow your crop effectively
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-3">
                          <p><strong>Harvest Tips:</strong> {selectedCrop?.harvestTips}</p>
                          <p><strong>Care Advice:</strong> {selectedCrop?.care}</p>
                          <p><strong>Growth Duration:</strong> {selectedCrop?.growthDuration}</p>
                          <p><strong>Common Diseases:</strong> {selectedCrop?.commonDiseases?.join(", ")}</p>
                          <p><strong>Pests:</strong> {selectedCrop?.pests?.join(", ")}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(prev => prev - 1)}
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </Button>
              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage(prev => prev + 1)}
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
