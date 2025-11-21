"use client";

import { Mail } from "lucide-react";
import { BaseFormModal } from "./BaseFormModal";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  return (
    <BaseFormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Join the Waitlist"
      description="Be among the first to know when CCN launches on December 12th. Get early access to programs, events, and community resources."
      submitLabel="Join the Waitlist Now"
      submitIcon={Mail}
      loadingLabel="Joining..."
      mutationFn={async (values) => {
        // TODO: Connect to backend API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return values;
      }}
      footerText="We respect your privacy. Unsubscribe anytime. No spam, ever."
    />
  );
}

