"use client";

import Link from "next/link";
import { Mail, Linkedin, Instagram, Youtube } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const footerSignupSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type FooterSignupValues = z.infer<typeof footerSignupSchema>;

export function Footer() {
  const form = useForm<FooterSignupValues>({
    resolver: zodResolver(footerSignupSchema),
    defaultValues: { email: "" },
  });

  const mutation = useMutation<FooterSignupValues, Error, FooterSignupValues>({
    mutationFn: async (values) => {
      // TODO connect to backend list
      await new Promise((resolve) => setTimeout(resolve, 800));
      return values;
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
    form.reset();
  });

  const FOOTER_LINKS = [
    { label: "About", href: "/#about" },
    { label: "Programmes", href: "/programmes" },
    { label: "Membership", href: "/#membership" },
    { label: "Community", href: "/community" },
    { label: "Events", href: "/events" },
    { label: "Resources", href: "/resources" },
    { label: "Stories", href: "/stories" },
    { label: "Partnerships", href: "/partnerships" },
    { label: "Join the Waitlist", href: "/join" },
  ];

  return (
    <footer id="contact" className="bg-foreground py-16 text-white">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-6">
            <Logo height={72} variant="white" />
            <p className="text-sm leading-relaxed text-white/70">
              Empowering African nurses to soar beyond the bedside.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-semibold">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 md:col-span-2">
            <h4 className="text-base font-semibold">Stay Connected</h4>
            <p className="text-sm text-white/70">
              Get weekly opportunities straight to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className={cn(
                  "bg-white/10 text-white placeholder:text-white/50 sm:flex-1",
                  form.formState.errors.email && "border border-destructive"
                )}
                {...form.register("email")}
              />
              <Button type="submit" className="bg-accent hover:bg-accent/90 sm:w-auto" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </span>
                ) : (
                  <Mail className="h-4 w-4" />
                )}
              </Button>
            </form>
            {form.formState.errors.email ? (
              <span className="text-xs text-white/70">{form.formState.errors.email.message}</span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-xs text-white/60 sm:flex-row sm:text-sm">
          <p>© {new Date().getFullYear()} Counter-Cultural Nurses. All rights reserved.</p>
          <div className="flex items-center gap-4 text-white/70">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
