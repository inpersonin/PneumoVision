import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, AlertCircle, Zap, Loader2, RefreshCw } from "lucide-react";
import { useInference } from "../../hooks/useInference";
import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";
import SectionHeader from "../ui/SectionHeader";
import AnimatedSection from "../ui/AnimatedSection";
import Disclaimer from "../ui/Disclaimer";
import Button from "../ui/Button";

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Detector() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const { predict, result, isLoading, error, reset } = useInference();

  const handleFile = useCallback((f) => {
    if (!f || !f.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(f);
    setFile(f);
  }, []);

  const handleRemove = useCallback(() => {
    setFile(null);
    setPreview(null);
    reset();
  }, [reset]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setDragActive(false);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  return (
    <section id="detector" className="section-padding relative">
      {/* Background ambient spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.01] rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <SectionHeader
          title="Pneumonia Detector"
          subtitle="Upload a chest X-ray image for AI-powered analysis"
        />

        <div className="mt-16">
          <AnimatedSection>
            {/* ── Upload Zone ── */}
            {!file && (
              <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`glass-panel border-dashed p-16 min-h-[320px] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 relative group overflow-hidden ${
                  dragActive ? "pulsing-border border-white/40 bg-white/[0.04] scale-[1.01]" : ""
                }`}
              >
                {/* Visual hover border overlay */}
                <div className="absolute inset-0 border border-white/5 rounded-2xl group-hover:border-white/15 transition-all duration-500" />

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />

                {/* Floating file icons details */}
                <div className="relative w-16 h-16 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/[0.04] group-hover:border-white/10 transition-all duration-500">
                  <Upload size={22} className="text-text-secondary group-hover:text-white transition-colors duration-500" />
                </div>

                <p className="text-sm font-medium text-text-primary tracking-wide">
                  Drag &amp; drop chest X-ray image
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  or click to browse local files
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                  className="mt-6 px-5 py-2 text-xs font-medium tracking-wide border border-white/10 rounded-full bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 cursor-pointer text-text-primary"
                >
                  Browse Files
                </button>

                <span className="text-[10px] text-text-muted mt-6 font-mono border border-white/5 bg-white/[0.01] px-3.5 py-1 rounded-full uppercase tracking-wider">
                  PNG, JPG, JPEG up to 10MB
                </span>
              </div>
            )}

            {/* ── Image Preview & Loading ── */}
            <AnimatePresence mode="wait">
              {file && preview && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <Card className="overflow-hidden relative border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
                    {/* Image display */}
                    <div className="relative overflow-hidden bg-black/40 flex justify-center items-center min-h-[350px]">
                      <img
                        src={preview}
                        alt={file.name}
                        className="max-w-full max-h-[420px] object-contain p-6 select-none opacity-90"
                      />

                      {/* Moving laser scan line */}
                      {isLoading && <div className="scan-laser" />}

                      {/* Dynamic status mask */}
                      {isLoading && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] flex flex-col items-center justify-center gap-4">
                          <Loader2 size={36} className="animate-spin text-white opacity-80" />
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest font-semibold animate-pulse">
                              Analyzing Chest X-Ray
                            </span>
                            <span className="text-[9px] font-mono text-text-muted">
                              Extracting deep features...
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Meta actions footer */}
                    <div className="p-5 bg-white/[0.01] border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-text-primary truncate max-w-[250px]">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-text-muted font-mono mt-0.5">
                          {formatFileSize(file.size)}
                        </p>
                      </div>

                      <div className="flex gap-3 shrink-0">
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={handleRemove}
                        >
                          Remove
                        </Button>
                        <Button
                          variant="primary"
                          size="small"
                          icon={Zap}
                          onClick={() => predict(file)}
                          disabled={isLoading}
                        >
                          {isLoading ? "Running..." : "Run Analysis"}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Error Banner ── */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <Card className="p-4 border border-white/10 bg-black/40 flex items-start gap-3">
                  <AlertCircle size={18} className="text-white shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white">Inference Server Error</p>
                    <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{error}</p>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* ── Prediction results display ── */}
            <AnimatePresence>
              {result && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6"
                >
                  <Card className="p-6 border border-white/10 bg-white/[0.01]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                          Analysis Output
                        </p>
                        <p className="text-3xl font-bold tracking-tight text-white mt-1.5">
                          {result.prediction}
                        </p>
                        <p className="text-xs font-mono text-text-secondary mt-2">
                          Confidence: {(result.confidence * 100).toFixed(1)}%
                        </p>
                      </div>

                      {/* Interactive Reset */}
                      <button
                        onClick={handleRemove}
                        className="w-8 h-8 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/10 flex items-center justify-center cursor-pointer transition-all duration-300"
                        title="Analyze another image"
                      >
                        <RefreshCw size={12} className="text-text-secondary" />
                      </button>
                    </div>

                    <div className="border-t border-white/5 my-6" />

                    <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-4">
                      Confidence Classification
                    </p>

                    <div className="space-y-4">
                      <ProgressBar
                        label="Normal Class Probability"
                        value={(result.probabilities?.NORMAL ?? 0) * 100}
                      />
                      <ProgressBar
                        label="Pneumonia Class Probability"
                        value={(result.probabilities?.PNEUMONIA ?? 0) * 100}
                      />
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Research Disclaimer ── */}
            <Disclaimer className="mt-8" />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
