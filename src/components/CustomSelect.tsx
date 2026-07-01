"use client";

import { useState } from "react";
import { useClickOutside } from "@/lib/hooks";

interface SelectOption {
  value: number | string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: number | string;
  onChange: (value: number | string) => void;
  className?: string;
  label?: string;
  placeholder?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  className = "",
  label,
  placeholder,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const handleSelect = (optionValue: number | string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-xs mb-1 text-fluent-secondary">
          {label}
        </label>
      )}

      <div ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="input-fluent w-full flex items-center justify-between cursor-pointer transition-all duration-200 min-h-[52px]"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={`truncate ${!selectedLabel ? "opacity-50" : ""}`}>
            {selectedLabel || placeholder || ""}
          </span>
          <span
            className={`ml-2 transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>

        {isOpen && (
          <div
            className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden backdrop-blur-xl mica-card border border-[var(--border-color)] shadow-xl"
            role="listbox"
          >
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    if (option.disabled) return;
                    handleSelect(option.value);
                  }}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-sm transition-colors duration-150 ${
                    option.disabled
                      ? "text-fluent-secondary opacity-50 cursor-not-allowed"
                      : value === option.value
                        ? "bg-xbox-green/20 text-xbox-green"
                        : "text-fluent-primary hover:bg-[var(--hover-bg)]"
                  }`}
                  disabled={option.disabled}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
