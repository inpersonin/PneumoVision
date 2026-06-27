import { Activity } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Detector", href: "#detector" },
  { label: "Model", href: "#model" },
  { label: "Performance", href: "#performance" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "#",
    icon: (props) => (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (props) => (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
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
          {/* Col 1 – Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Activity size={20} className="text-white" />
              <span className="font-bold text-white">PneumoVision AI</span>
            </div>
            <p className="text-sm text-text-secondary mt-2">
              AI-Powered Pneumonia Detection
            </p>
            <p className="text-xs text-text-muted mt-2">
              Developed for academic research and educational purposes.
            </p>
          </div>

          {/* Col 2 – Quick Links */}
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

          {/* Col 3 – Connect */}
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
                  <link.icon size={16} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-text-muted">
            © 2025 PneumoVision AI. All rights reserved.
          </span>
          <span className="text-xs text-text-muted">
            Built for Research &amp; Education
          </span>
        </div>
      </div>
    </footer>
  );
}
