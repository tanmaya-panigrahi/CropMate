import { useState } from "react";
import { mockHistory } from "@/constants/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function History() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);

  const filteredData = mockHistory.filter((entry) =>
    entry.summary.disease.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4 md:p-6 lg:p-10 pb-20 md:pb-2">
      <h1 className="text-2xl font-semibold mb-4">Diagnosis History</h1>

      {/* Search Bar */}
      <div className="mb-6 max-w-md">
        <Input
          type="text"
          placeholder="Search by disease..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <img
            src="/no-data.svg"
            alt="No data"
            className="w-40 h-40 mb-6 opacity-70"
          />
          <p className="text-xl font-semibold">No data available</p>
          <p className="text-sm mt-2 max-w-md">
            You haven't run any diagnoses yet or no matches found for your search.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedData.map((entry) => (
            <Card key={entry.id} className="shadow-sm">
              <CardContent className="p-4 space-y-3">
                <img
                  src={entry.image}
                  alt="diagnosis"
                  className="w-full h-40 object-cover rounded-md"
                />
                <p className="text-sm text-muted-foreground">
                  {format(new Date(entry.date), "PPpp")}
                </p>
                <div>
                  <p><span className="font-semibold">Disease:</span> {entry.summary.disease}</p>
                  <p><span className="font-semibold">Cause:</span> {entry.summary.cause.slice(0, 40)}...</p>
                  <p><span className="font-semibold">Cure:</span> {entry.summary.cure.slice(0, 40)}...</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => setSelectedEntry(entry)}
                      className="flex items-center gap-1 text-background bg-primary hover:bg-green-800"
                    >
                      <Eye className="h-4 w-4" /> View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    {selectedEntry && (
                      <div className="space-y-4 ">
                        <img
                          src={selectedEntry.image}
                          alt="Full diagnosis"
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(selectedEntry.date), "PPpp")}
                        </p>
                        <p><strong>Disease:</strong> {selectedEntry.summary.disease}</p>
                        <p><strong>Cause:</strong> {selectedEntry.summary.cause}</p>
                        <p><strong>Cure:</strong> {selectedEntry.summary.cure}</p>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </Button>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}



