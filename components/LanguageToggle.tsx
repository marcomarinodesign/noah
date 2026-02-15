"use client";

export type LanguageCode = "es" | "ca";

const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "ca", label: "CA" },
];

interface LanguageToggleProps {
  value: LanguageCode;
  onChange: (value: LanguageCode) => void;
  languages?: { code: LanguageCode; label: string }[];
}

export function LanguageToggle({
  value,
  onChange,
  languages = LANGUAGES,
}: LanguageToggleProps) {
  return (
    <div className="language-toggle" role="group" aria-label="Idioma">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          role="tab"
          aria-selected={value === lang.code}
          aria-label={lang.label}
          className={`language-toggle__btn ${value === lang.code ? "language-toggle__btn--active" : ""}`}
          onClick={() => onChange(lang.code)}
        >
          {lang.label}
        </button>
      ))}
      <style jsx>{`
        .language-toggle {
          display: inline-flex;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 2px;
          background: #f9fafb;
        }
        .language-toggle__btn {
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
          background: transparent;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .language-toggle__btn:hover {
          color: #374151;
          background: #f3f4f6;
        }
        .language-toggle__btn--active {
          color: #fff;
          background: #111827;
        }
        .language-toggle__btn--active:hover {
          color: #fff;
          background: #1f2937;
        }
      `}</style>
    </div>
  );
}
