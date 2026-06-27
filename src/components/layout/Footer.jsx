import { Activity } from "lucide-react";
import { LINKS } from "../../config/modelConfig";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Detector", href: "#detector" },
  { label: "Model", href: "#model" },
  { label: "Performance", href: "#performance" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: LINKS.github,
    icon: (props) => (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "Hugging Face",
    href: LINKS.huggingface,
    icon: (props) => (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4 9.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5V17h-8v-2.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-surface-1">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <Activity size={20} className="text-white" />
              <span className="font-bold text-white">PneumoVision AI</span>
            </div>
            <p className="text-sm text-text-secondary mt-2">
              Chest X-ray Pneumonia Detection System
            </p>
            <p className="text-xs text-text-muted mt-2">
              Developed for academic research and educational purposes.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="block text-sm text-text-secondary hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
              Connect
            </h4>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors"
                >
                  <link.icon />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-text-muted">
            © 2026 PneumoVision AI. All rights reserved.
          </span>
          <span className="text-xs text-text-muted">
            Built for Research &amp; Education
          </span>
        </div>
      </div>
    </footer>
  );
}
