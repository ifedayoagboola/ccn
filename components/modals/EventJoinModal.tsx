"use client";

import { Calendar } from "lucide-react";
import { BaseFormModal } from "./BaseFormModal";

interface EventJoinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle?: string;
}

export function EventJoinModal({ open, onOpenChange, eventTitle }: EventJoinModalProps) {
  const description = eventTitle ? (
    <>Register for <strong>{eventTitle}</strong> and secure your spot.</>
  ) : (
    "Register for this upcoming event and secure your spot."
  );

  return (
    <BaseFormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Join Upcoming Event"
      description={description}
      submitLabel="Register for Event"
      submitIcon={Calendar}
      loadingLabel="Registering..."
      mutationFn={async (values) => {
        // TODO: Connect to backend API for event registration
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return values;
      }}
      footerText="You will receive event details and reminders via email."
    />
  );
}

