/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ImagePlus, Camera, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function Diagnose() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Only JPEG and PNG images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be under 5MB.");
      return;
    }

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setDiagnosis(null);
    setErrorMessage("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleImageUpload = (e) => handleFile(e.target.files[0]);

  const handleTakePhoto = (e) => handleFile(e.target.files[0]);

  const runDiagnosis = async () => {
    if (!image) return;

    setLoading(true);
    setErrorMessage("");
    setDiagnosis(null);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/diagnose`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { disease, imageUrl, explanation, message } = response.data;

      setDiagnosis({
        disease,
        imageUrl,
        explanation,
        message,
      });

    } catch (error) {
      console.error("Diagnosis error:", error);
      const msg =
        error?.response?.data?.details ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };


  const resetAll = () => {
    setImage(null);
    setPreviewUrl(null);
    setDescription("");
    setDiagnosis(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 md:pb-2 pb-20">
      <h1 className="text-2xl font-bold text-center">Diagnose Crop Issue</h1>

      {/* Drag & Drop Zone */}
      {!previewUrl && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed bg-white border-gray-400 rounded-xl p-8 flex flex-col items-center justify-center text-center text-gray-600 bg-muted hover:border-green-600 transition"
        >
          <ImagePlus className="w-10 h-10 mb-2 text-gray-500" />
          <p className="text-sm">Drag & drop an image here</p>
          <p className="text-xs text-muted-foreground mt-1">or use options below</p>
        </div>
      )}

      {/* File Inputs */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageUpload}
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        className="hidden"
        onChange={handleTakePhoto}
      />

      {/* Buttons */}
      {!previewUrl && (
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-card md:hover:bg-gray-100"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImagePlus size={18} />
            Upload from Device
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 bg-card md:hover:bg-gray-100"
            onClick={() => cameraInputRef.current?.click()}
          >
            <Camera size={18} />
            Take Photo
          </Button>
        </div>
      )}

      {/* Preview */}
      {previewUrl && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-lg shadow"
          />
          <Button variant="ghost" className="bg-card" onClick={resetAll}>
            <ImagePlus size={16} />
            Upload Another Image
          </Button>
        </div>
      )}

      {/* Description Input */}
      {previewUrl && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Additional Info (optional)</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue or symptoms if any..."
            className="resize-none"
          />
        </div>
      )}

      {/* Run Diagnosis Button */}
      {previewUrl && !diagnosis && (
        <Button
          onClick={runDiagnosis}
          className="w-full mt-2 bg-primary hover:bg-green-800 text-white text-md font-semibold"
        >
          Run Diagnosis
        </Button>
      )}

      {errorMessage && (
        <div className="text-red-600 border border-red-400 bg-red-100 px-4 py-2 rounded-md">
          {errorMessage}
        </div>
      )}

      {/* Loader or Result */}
      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-3/4 rounded" />
          <Skeleton className="h-6 w-1/2 rounded" />
        </div>
      )}

      {diagnosis && (
        <div className="bg-white border border-green-200 rounded-xl p-6 space-y-4 shadow-md">
          <h2 className="text-xl font-bold text-green-800">Diagnosis Result</h2>

          {diagnosis.imageUrl && (
            <img
              src={diagnosis.imageUrl}
              alt="Diagnosed Crop"
              className="w-full md:w-64 h-auto object-cover rounded-lg shadow"
            />
          )}

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              <strong>Status:</strong> {diagnosis.message}
            </p>
            <p className="text-md font-medium text-gray-800">
              <strong>Disease:</strong> {diagnosis.disease.replace(/_/g, ' ')}
            </p>
          </div>

          <div className="prose max-w-none prose-sm text-gray-700">
            <ReactMarkdown>{diagnosis.explanation}</ReactMarkdown>
          </div>
        </div>
      )}


      {/* History Button */}
      {diagnosis && (
        <div className="flex justify-end">
          <Button variant="outline" className="flex items-center gap-2 bg-primary  text-background hover:bg-white hover:text-black" onClick={() => navigate("/dashboard/history")}>
            <History size={16} />
            View Diagnosis History
          </Button>
        </div>
      )}
    </div>
  );
}
