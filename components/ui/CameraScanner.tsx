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
      const message =
        err instanceof DOMException && err.name === "NotAllowedError"
          ? "Camera access denied. Please allow camera permissions in your browser settings."
          : err instanceof DOMException && err.name === "NotFoundError"
            ? "No camera found on this device."
            : "Could not access camera.";
      setError(message);
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
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Scan failed (${res.status}).`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="flex w-full max-w-xl flex-col items-center space-y-5 rounded-[2rem] border border-[var(--fs-border)] bg-[var(--fs-surface)] p-4 text-[var(--fs-text)] shadow-[0_30px_100px_var(--fs-shadow)] backdrop-blur-3xl sm:p-5">
      <div className="aspect-video w-full overflow-hidden rounded-[1.5rem] border border-[var(--fs-border)] bg-[var(--fs-bg)]">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          aria-label="Camera feed for food scanning"
          className="h-full w-full object-cover"
        />
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="grid w-full gap-2 sm:grid-cols-3">
        <button
          onClick={startCamera}
          className="fs-button-secondary"
        >
          Open
        </button>

        <button
          onClick={captureAndAnalyze}
          disabled={loading}
          className="fs-button-primary disabled:pointer-events-none disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Capture"}
        </button>

        <button
          onClick={stopCamera}
          className="rounded-full border border-[var(--fs-border)] bg-[var(--fs-surface)] px-4 py-3 text-sm font-semibold text-[var(--fs-muted)] transition duration-300 hover:-translate-y-px hover:border-[var(--fs-border-strong)] hover:text-[var(--fs-text)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:ring-offset-[var(--fs-bg)]"
        >
          Stop
        </button>
      </div>

      {error && <p className="w-full rounded-2xl border border-red-300/20 bg-red-300/5 px-4 py-3 text-sm text-red-100">{error}</p>}

      {result && (
        <div className="w-full space-y-4 rounded-[1.5rem] border border-[var(--fs-border)] bg-[var(--fs-surface)] p-4">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.04em] text-[var(--fs-text)]">{result.meal_name}</h2>
            <p className="mt-2 text-sm text-[var(--fs-muted)]">Total calories: {result.total_estimated_calories}</p>
            <p className="text-sm text-[var(--fs-muted)]">Confidence: {(result.confidence * 100).toFixed(0)}%</p>
          </div>

          <div className="space-y-2">
            {result.items.map((item, index) => (
              <div key={`item-${index}`} className="rounded-2xl border border-[var(--fs-border)] bg-[var(--fs-surface)] p-4">
                <p className="font-semibold text-[var(--fs-text)]">{item.name}</p>
                <p className="mt-2 text-sm text-[var(--fs-muted)]">Portion: {item.estimated_portion}</p>
                <p className="text-sm text-[var(--fs-muted)]">Calories: {item.estimated_calories}</p>
                <p className="text-sm text-[var(--fs-muted)]">
                  P: {item.protein_g}g | C: {item.carbs_g}g | F: {item.fat_g}g
                </p>
              </div>
            ))}
          </div>

          {result.notes.length > 0 && (
            <div>
              <p className="font-semibold text-[var(--fs-text)]">Notes</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--fs-muted)]">
                {result.notes.map((note, index) => (
                  <li key={`note-${index}`}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
