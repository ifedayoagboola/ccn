"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LucideIcon } from "lucide-react";

const baseFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  country: z.string().min(2, "Country is required"),
});

type BaseFormValues = z.infer<typeof baseFormSchema>;

interface BaseFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string | React.ReactNode;
  submitLabel: string;
  submitIcon: LucideIcon;
  loadingLabel: string;
  mutationFn: (values: BaseFormValues) => Promise<BaseFormValues>;
  footerText?: string;
}

export function BaseFormModal({
  open,
  onOpenChange,
  title,
  description,
  submitLabel,
  submitIcon: SubmitIcon,
  loadingLabel,
  mutationFn,
  footerText,
}: BaseFormModalProps) {
  const form = useForm<BaseFormValues>({
    resolver: zodResolver(baseFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      country: "",
    },
  });

  const mutation = useMutation<BaseFormValues, Error, BaseFormValues>({
    mutationFn,
    onSuccess: () => {
      form.reset();
      onOpenChange(false);
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              {...form.register("fullName")}
              className={form.formState.errors.fullName ? "border-destructive" : ""}
            />
            {form.formState.errors.fullName && (
              <p className="text-xs text-destructive">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...form.register("email")}
              className={form.formState.errors.email ? "border-destructive" : ""}
            />
            {form.formState.errors.email && (
              <p className="text-xs text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              placeholder="Select your country"
              {...form.register("country")}
              className={form.formState.errors.country ? "border-destructive" : ""}
            />
            {form.formState.errors.country && (
              <p className="text-xs text-destructive">
                {form.formState.errors.country.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary-dark"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {loadingLabel}
              </>
            ) : (
              <>
                <SubmitIcon className="mr-2 h-4 w-4" />
                {submitLabel}
              </>
            )}
          </Button>
        </form>
        {footerText && (
          <p className="text-xs text-muted-foreground text-center">{footerText}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

