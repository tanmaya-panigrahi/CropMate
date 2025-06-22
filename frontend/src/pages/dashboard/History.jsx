/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import ReactMarkdown from "react-markdown";

const ITEMS_PER_PAGE = 6;

export default function History() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/history`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setHistoryData(response.data);
      } catch (err) {
        console.error("Error fetching history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredData = historyData.filter((entry) =>
    entry.disease?.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4 md:p-6 lg:p-10 pb-20 md:pb-2">
      <h1 className="text-2xl font-semibold mb-4">Diagnosis History</h1>

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

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
          <p className="text-xl font-semibold">Loading history...</p>
        </div>
      ) : filteredData.length === 0 ? (
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
            <Card key={entry._id} className="shadow-sm">
              <CardContent className="p-4 space-y-3">
                <img
                  src={entry.imageUrl}
                  alt="diagnosis"
                  className="w-full h-40 object-cover rounded-md"
                />
                <p className="text-sm text-muted-foreground">
                  {format(new Date(entry.createdAt), "PPpp")}
                </p>
                <div>
                  <p>
                    <span className="font-semibold">Disease:</span> {entry.disease}
                  </p>
                  <p>
                    <span className="font-semibold">Explanation:</span>{" "}
                    {entry.explanation?.slice(0, 40)}...
                  </p>
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
                  <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                    {selectedEntry && (
                      <div className="space-y-4">
                        <img
                          src={selectedEntry.imageUrl}
                          alt="Full diagnosis"
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(selectedEntry.createdAt), "PPpp")}
                        </p>
                        <p>
                          <strong>Disease:</strong> {selectedEntry.disease}
                        </p>
                        <div className="prose prose-sm max-w-none text-gray-700">
                          <ReactMarkdown
                            components={{
                              p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                              li: ({ node, ...props }) => <li className="ml-4 list-disc" {...props} />,
                            }}
                          >
                            {selectedEntry.explanation}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </DialogContent>

                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
