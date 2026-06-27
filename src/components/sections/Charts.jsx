import { CHART_DATA } from "../../config/modelConfig";
import Card from "../ui/Card";
import AnimatedSection from "../ui/AnimatedSection";
import SectionHeader from "../ui/SectionHeader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0c0c0c] border border-white/10 rounded-xl px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <p className="text-[10px] font-mono text-text-secondary mb-1">Epoch {label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-xs font-mono font-medium text-white flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            {p.name}: {typeof p.value === "number" ? p.value.toFixed(4) : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Charts() {
  return (
    <section className="section-padding relative">
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          title="Training Analytics"
          subtitle="Model training histories, losses, and learning progressions"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
          {/* Chart 1 — Training Loss */}
          <AnimatedSection>
            <Card className="p-6 bg-white/[0.015] border border-white/5 shadow-2xl">
              <p className="font-mono text-xs text-text-secondary uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Training Loss Curve
              </p>
              <div className="w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={CHART_DATA.trainingLoss} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis
                      dataKey="epoch"
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: "#666", fontSize: 10, fontFamily: "monospace" }}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: "#666", fontSize: 10, fontFamily: "monospace" }}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.05)" }} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ffffff"
                      strokeWidth={1.5}
                      dot={{ fill: "#ffffff", r: 2.5, strokeWidth: 0 }}
                      activeDot={{ r: 4, strokeWidth: 0 }}
                      name="Loss"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </AnimatedSection>

          {/* Chart 2 — Validation Loss */}
          <AnimatedSection delay={0.1}>
            <Card className="p-6 bg-white/[0.015] border border-white/5 shadow-2xl">
              <p className="font-mono text-xs text-text-secondary uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse" />
                Validation Loss Curve
              </p>
              <div className="w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={CHART_DATA.validationLoss} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis
                      dataKey="epoch"
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: "#666", fontSize: 10, fontFamily: "monospace" }}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: "#666", fontSize: 10, fontFamily: "monospace" }}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.05)" }} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#888888"
                      strokeWidth={1.5}
                      dot={{ fill: "#888888", r: 2.5, strokeWidth: 0 }}
                      activeDot={{ r: 4, strokeWidth: 0 }}
                      name="Loss"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </AnimatedSection>

          {/* Chart 3 — Accuracy progression */}
          <AnimatedSection>
            <Card className="p-6 bg-white/[0.015] border border-white/5 shadow-2xl">
              <p className="font-mono text-xs text-text-secondary uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Accuracy Progression
              </p>
              <div className="w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={CHART_DATA.accuracy} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis
                      dataKey="epoch"
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: "#666", fontSize: 10, fontFamily: "monospace" }}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: "#666", fontSize: 10, fontFamily: "monospace" }}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.05)" }} />
                    <Line
                      type="monotone"
                      dataKey="training"
                      stroke="#ffffff"
                      strokeWidth={1.5}
                      dot={{ fill: "#ffffff", r: 2, strokeWidth: 0 }}
                      name="Training"
                    />
                    <Line
                      type="monotone"
                      dataKey="validation"
                      stroke="#666666"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      dot={{ fill: "#666666", r: 2, strokeWidth: 0 }}
                      name="Validation"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </AnimatedSection>

          {/* Chart 4 — Test set metrics */}
          <AnimatedSection delay={0.1}>
            <Card className="p-6 bg-white/[0.015] border border-white/5 shadow-2xl">
              <p className="font-mono text-xs text-text-secondary uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Test Set Metrics
              </p>
              <div className="w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHART_DATA.testMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis
                      dataKey="name"
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: "#666", fontSize: 10, fontFamily: "monospace" }}
                      axisLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      stroke="rgba(255,255,255,0.2)"
                      tick={{ fill: "#666", fontSize: 10, fontFamily: "monospace" }}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                    <Bar
                      dataKey="value"
                      fill="#ffffff"
                      radius={[4, 4, 0, 0]}
                      name="Score (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
