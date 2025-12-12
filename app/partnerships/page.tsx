"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  organisation: string;
  need: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  organisation?: string;
  need?: string;
}

export default function PartnershipsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    organisation: "",
    need: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.organisation || formData.organisation.trim().length < 2) {
      newErrors.organisation = "Organisation name must be at least 2 characters";
    }

    if (!formData.need || formData.need.trim().length < 10) {
      newErrors.need = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/partnerships/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          organisation: formData.organisation.trim(),
          need: formData.need.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show more detailed error message
        const errorMsg = data.error || "Failed to submit partnership request";
        console.error('API Error:', {
          status: response.status,
          error: data.error,
          code: data.code,
          details: data.details,
        });
        throw new Error(errorMsg);
      }

      // Success
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        organisation: "",
        need: "",
      });
      setErrors({});
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="partnerships" />
      <main>
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 text-center">
              <p className="text-xs uppercase tracking-[0.28em] text-primary/70">Partnerships & Hiring</p>
              <h1 className="text-4xl font-semibold text-foreground sm:text-[44px]">
                Let&apos;s build something together.
              </h1>
              <p className="text-base leading-relaxed text-foreground/70">
                Share your contact and what you need. We&apos;ll reply within 2 business days.
              </p>
            </div>

            <div className="mt-12 rounded-[28px] border border-primary/12 bg-card p-8 shadow-[0_32px_70px_-48px_rgba(41,18,15,0.25)]">
              {!submitted ? (
                <form className="grid gap-6" onSubmit={handleSubmit}>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={cn(errors.name && "border-destructive")}
                      disabled={loading}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Work email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={cn(errors.email && "border-destructive")}
                        disabled={loading}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email}</p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="organisation">Organisation *</Label>
                      <Input
                        id="organisation"
                        placeholder="Company or hospital name"
                        value={formData.organisation}
                        onChange={(e) => handleChange("organisation", e.target.value)}
                        className={cn(errors.organisation && "border-destructive")}
                        disabled={loading}
                      />
                      {errors.organisation && (
                        <p className="text-xs text-destructive">{errors.organisation}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="need">What do you need? *</Label>
                    <Textarea
                      id="need"
                      placeholder="Briefly describe the partnership or roles you have in mind."
                      value={formData.need}
                      onChange={(e) => handleChange("need", e.target.value)}
                      className={cn("min-h-[120px]", errors.need && "border-destructive")}
                      disabled={loading}
                    />
                    {errors.need && (
                      <p className="text-xs text-destructive">{errors.need}</p>
                    )}
                  </div>

                  {error && (
                    <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                      <p className="text-sm font-semibold text-destructive">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary-dark"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </span>
                    ) : (
                      "Send request"
                    )}
                  </Button>

                  <p className="text-xs text-foreground/60">
                    We respond within 2 business days. For urgent needs, email partnerships@counterculturalnurses.com.
                  </p>
                </form>
              ) : (
                <div className="space-y-4 text-center">
                  <p className="text-xl font-semibold text-foreground">Request received ✅</p>
                  <p className="text-sm text-foreground/70">
                    We&apos;ll reply within 2 business days. If it&apos;s urgent, email partnerships@counterculturalnurses.com.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
