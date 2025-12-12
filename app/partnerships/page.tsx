"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const partnershipSchema = z.object({
  name: z.string().min(1, "Please enter your full name").min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  organisation: z.string().min(1, "Please enter your organisation name").min(2, "Organisation name must be at least 2 characters"),
  need: z.string().min(1, "Please describe what you need").min(10, "Please describe what you need (at least 10 characters)"),
});

type PartnershipFormValues = z.infer<typeof partnershipSchema>;

const defaultFormValues: PartnershipFormValues = {
  name: "",
  email: "",
  organisation: "",
  need: "",
};

export default function PartnershipsPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<PartnershipFormValues>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: defaultFormValues,
  });

  const mutation = useMutation<PartnershipFormValues, Error, PartnershipFormValues>({
    mutationFn: async (values) => {
      // TODO: Connect to backend API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return values;
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset(defaultFormValues);
      setTimeout(() => setSubmitted(false), 4000);
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

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
                      className={cn(
                        form.formState.errors.name && "border-destructive"
                      )}
                      {...form.register("name")}
                    />
                    {form.formState.errors.name && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Work email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        className={cn(
                          form.formState.errors.email && "border-destructive"
                        )}
                        {...form.register("email")}
                      />
                      {form.formState.errors.email && (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="organisation">Organisation *</Label>
                      <Input
                        id="organisation"
                        placeholder="Company or hospital name"
                        className={cn(
                          form.formState.errors.organisation && "border-destructive"
                        )}
                        {...form.register("organisation")}
                      />
                      {form.formState.errors.organisation && (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.organisation.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="need">What do you need? *</Label>
                    <Textarea
                      id="need"
                      placeholder="Briefly describe the partnership or roles you have in mind."
                      className={cn(
                        "min-h-[120px]",
                        form.formState.errors.need && "border-destructive"
                      )}
                      {...form.register("need")}
                    />
                    {form.formState.errors.need && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.need.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary-dark"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
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
