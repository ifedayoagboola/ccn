"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { useForm, Controller } from "react-hook-form";
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
import { Loader2, CreditCard, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const paymentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const defaultPaymentValues: PaymentFormValues = {
  name: "",
  email: "",
};

interface CommunityJoinPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PAYMENT_AMOUNT = 20000; // 20,000 Naira

export function CommunityJoinPaymentModal({
  open,
  onOpenChange,
}: CommunityJoinPaymentModalProps) {
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: defaultPaymentValues,
    mode: "onSubmit",
    shouldUnregister: false, // Keep values in form state
    reValidateMode: "onSubmit", // Only revalidate on submit
  });

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      // Reset form with default values
      form.reset(defaultPaymentValues, {
        keepDefaultValues: true,
        keepErrors: false,
        keepDirty: false,
        keepIsSubmitted: false,
        keepTouched: false,
        keepIsValid: false,
        keepSubmitCount: false,
      });
      setPaymentStatus("idle");
      setErrorMessage("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]); // form is stable from useForm, no need to include in deps

  const initializePayment = useMutation({
    mutationFn: async (values: PaymentFormValues) => {
      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          name: values.name,
          amount: PAYMENT_AMOUNT,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to initialize payment");
      }

      return response.json();
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      // Validate environment variable before proceeding
      const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!paystackPublicKey) {
        throw new Error("Payment system is not configured. Please contact support.");
      }

      // Ensure values are strings (defensive check)
      if (!values.email || typeof values.email !== "string") {
        throw new Error("Email is required and must be a valid string");
      }
      if (!values.name || typeof values.name !== "string") {
        throw new Error("Name is required and must be a valid string");
      }

      // values is already validated by React Hook Form + Zod
      setPaymentStatus("processing");
      setErrorMessage("");

      const paymentData = await initializePayment.mutateAsync(values);

      // Wait for Paystack script to load if needed
      const loadPaystack = () => {
        return new Promise<void>((resolve, reject) => {
          if (typeof window !== "undefined" && (window as any).PaystackPop) {
            resolve();
            return;
          }
          
          // Wait for script to load
          let attempts = 0;
          const maxAttempts = 50; // 5 seconds max
          const checkInterval = setInterval(() => {
            attempts++;
            if ((window as any).PaystackPop) {
              clearInterval(checkInterval);
              resolve();
            } else if (attempts >= maxAttempts) {
              clearInterval(checkInterval);
              reject(new Error("Paystack script failed to load. Please refresh the page and try again."));
            }
          }, 100);
        });
      };

      try {
        await loadPaystack();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Paystack payment system is not available. Please refresh the page and try again.";
        setErrorMessage(errorMessage);
        setPaymentStatus("error");
        return;
      }

      // Open Paystack payment popup
      // Use reference from server-side initialization with email and amount
      // This approach works better with callbacks
      if (typeof window !== "undefined" && (window as any).PaystackPop) {
        // Close our dialog to prevent z-index conflicts with Paystack iframe
        // Paystack will open its own modal on top
        onOpenChange(false);

        // Define callback as a regular function (not async)
        // Paystack requires a synchronous function reference
        const paymentCallback = function (response: any) {
          // Verify payment on server (using promises instead of async/await)
          fetch(`/api/payments/verify?reference=${response.reference}`)
            .then((verifyResponse) => {
              if (!verifyResponse.ok) {
                throw new Error("Payment verification failed");
              }
              return verifyResponse.json();
            })
            .then((verifyData) => {
              if (verifyData.success) {
                setPaymentStatus("success");
                form.reset(defaultPaymentValues);
                // Reopen our modal to show success message
                onOpenChange(true);
                // Close modal after 3 seconds
                setTimeout(() => {
                  onOpenChange(false);
                  setPaymentStatus("idle");
                }, 3000);
              } else {
                throw new Error("Payment was not successful");
              }
            })
            .catch((error) => {
              console.error("Payment verification error:", error);
              setPaymentStatus("error");
              setErrorMessage(
                "Payment was processed but verification failed. Please contact support."
              );
              // Reopen our modal to show error
              onOpenChange(true);
            });
        };

        const paymentClose = function () {
          // If payment was closed without completion, reopen our modal
          setPaymentStatus("idle");
          setErrorMessage("");
          onOpenChange(true);
        };

        const handler = (window as any).PaystackPop.setup({
          key: paystackPublicKey,
          email: values.email,
          amount: PAYMENT_AMOUNT * 100, // Convert to kobo
          ref: paymentData.reference, // Use reference from server initialization
          metadata: {
            custom_fields: [
              {
                display_name: "Full Name",
                variable_name: "full_name",
                value: values.name,
              },
            ],
          },
          callback: paymentCallback,
          onClose: paymentClose,
        });

        handler.openIframe();
      } else {
        // Fallback: redirect to Paystack payment page
        window.location.href = paymentData.authorization_url;
      }
    } catch (error: any) {
      console.error("Payment initialization error:", error);
      setPaymentStatus("error");
      setErrorMessage(error.message || "Failed to initialize payment. Please try again.");
    }
  });

  const handleClose = () => {
    if (paymentStatus === "processing") {
      return; // Prevent closing during payment
    }
    form.reset(defaultPaymentValues);
    setPaymentStatus("idle");
    setErrorMessage("");
    onOpenChange(false);
  };

  const [paystackLoaded, setPaystackLoaded] = useState(false);

  useEffect(() => {
    // Check if Paystack is already loaded
    if (typeof window !== "undefined" && (window as any).PaystackPop) {
      setPaystackLoaded(true);
    }
  }, []);

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
        onLoad={() => {
          setPaystackLoaded(true);
        }}
        onError={() => {
          console.error("Failed to load Paystack script");
        }}
      />
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join the CCN Community</DialogTitle>
          <DialogDescription>
            Complete your payment of ₦{PAYMENT_AMOUNT.toLocaleString()} to join our Slack community
            and start your remote nursing journey.
          </DialogDescription>
        </DialogHeader>

        {paymentStatus === "success" ? (
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Payment Successful! 🎉
                </h3>
                <p className="mt-2 text-sm text-foreground/70">
                  You&apos;ve been added to our Slack community. Check your email for the
                  invitation link.
                </p>
              </div>
            </div>
          </div>
        ) : paymentStatus === "error" ? (
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Payment Error
                </h3>
                <p className="mt-2 text-sm text-destructive">{errorMessage}</p>
              </div>
              <Button
                onClick={() => {
                  setPaymentStatus("idle");
                  setErrorMessage("");
                }}
                variant="outline"
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    {...field}
                    className={cn(
                      form.formState.errors.name && "border-destructive"
                    )}
                    disabled={paymentStatus === "processing"}
                  />
                )}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                    className={cn(
                      form.formState.errors.email && "border-destructive"
                    )}
                    disabled={paymentStatus === "processing"}
                  />
                )}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                This email will be used to add you to our Slack community.
              </p>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Total Amount
                </span>
                <span className="text-lg font-semibold text-primary">
                  ₦{PAYMENT_AMOUNT.toLocaleString()}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary-dark"
              disabled={paymentStatus === "processing" || initializePayment.isPending || !paystackLoaded}
            >
              {paymentStatus === "processing" || initializePayment.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay ₦{PAYMENT_AMOUNT.toLocaleString()}
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Secure payment powered by Paystack. Your information is safe and encrypted.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
}

