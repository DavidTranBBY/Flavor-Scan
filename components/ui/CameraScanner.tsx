"use client";

import { useEffect, useRef, useState } from "react";

type ScanResult = {
  meal_name: string;
  is_food_detected: boolean;
  total_estimated_calories: number;
  confidence: number;
  items: Array<{
    name: string;
    estimated_portion: string;
    estimated_grams: number;
    estimated_calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    confidence: number;
  }>;
  notes: string[];
};

export default function CameraScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);

  const startCamera = async () => {
    try {
      setError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
      setError("Could not access camera.");
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureAndAnalyze = async () => {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) {
        throw new Error("Camera elements are missing.");
      }

      if (!video.videoWidth || !video.videoHeight) {
        throw new Error("Video is not ready yet.");
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Could not get canvas context.");
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);

      const res = await fetch("/api/scan-food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageDataUrl }),
      });

      if (!res.ok) {
        throw new Error("Scan failed.");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="flex flex-col items-center max-w-xl rounded-2xl border p-4 space-y-4">
      <div className="aspect-video overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full object-cover"
        />
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-2">
        <button
          onClick={startCamera}
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Open
        </button>

        <button
          onClick={captureAndAnalyze}
          disabled={loading}
          className="rounded-lg bg-green-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Capture"}
        </button>

        <button
          onClick={stopCamera}
          className="rounded-lg bg-red-500 px-4 py-2 text-white"
        >
          Stop
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {result && (
        <div className="rounded-xl border p-4 space-y-3">
          <div>
            <h2 className="text-lg font-semibold">{result.meal_name}</h2>
            <p>Total calories: {result.total_estimated_calories}</p>
            <p>Confidence: {(result.confidence * 100).toFixed(0)}%</p>
          </div>

          <div className="space-y-2">
            {result.items.map((item, index) => (
              <div key={index} className="rounded-lg border p-3">
                <p className="font-medium">{item.name}</p>
                <p>Portion: {item.estimated_portion}</p>
                <p>Calories: {item.estimated_calories}</p>
                <p>
                  P: {item.protein_g}g | C: {item.carbs_g}g | F: {item.fat_g}g
                </p>
              </div>
            ))}
          </div>

          {result.notes.length > 0 && (
            <div>
              <p className="font-medium">Notes</p>
              <ul className="list-disc pl-5">
                {result.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}