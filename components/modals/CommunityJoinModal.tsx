"use client";

import { Users } from "lucide-react";
import { BaseFormModal } from "./BaseFormModal";

interface CommunityJoinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommunityJoinModal({ open, onOpenChange }: CommunityJoinModalProps) {
  return (
    <BaseFormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Join the CCN Community"
      description="Join the CCN community for a token and get immediate access to mentors, accountability pods, partner labs, and weekly programming."
      submitLabel="Join Community (Token Required)"
      submitIcon={Users}
      loadingLabel="Processing..."
      mutationFn={async (values) => {
        // TODO: Connect to backend API for community join with token payment
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return values;
      }}
      footerText="You will be redirected to complete payment after submitting this form."
    />
  );
}

