import { z } from 'zod';

/**
 * Frontend validation schema - simple validation like payment form
 * React Hook Form with zodResolver handles validation automatically
 * No preprocess needed - React Hook Form ensures values are strings
 */
export const partnershipSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(200, 'Name must be less than 200 characters'),
  email: z.string().email('Enter a valid email address').max(255, 'Email must be less than 255 characters'),
  organisation: z.string().min(2, 'Organisation name must be at least 2 characters').max(200, 'Organisation name must be less than 200 characters'),
  need: z.string().min(10, 'Description must be at least 10 characters').max(5000, 'Description must be less than 5000 characters'),
});

export type PartnershipFormValues = z.infer<typeof partnershipSchema>;

/**
 * Backend version with preprocessing to handle undefined/null values
 * This is used in API routes where data might come from external sources
 * Similar pattern to payment form - simple validation without transformations in schema
 */
export const partnershipSchemaWithPreprocess = z.object({
  name: z.preprocess(
    (val) => {
      if (val === undefined || val === null) return '';
      return typeof val === 'string' ? val.trim() : String(val).trim();
    },
    z.string()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(200, 'Name must be less than 200 characters')
  ),
  email: z.preprocess(
    (val) => {
      if (val === undefined || val === null) return '';
      return typeof val === 'string' ? val.trim().toLowerCase() : String(val).trim().toLowerCase();
    },
    z.string()
      .min(1, 'Email is required')
      .email('Enter a valid email address')
      .max(255, 'Email must be less than 255 characters')
  ),
  organisation: z.preprocess(
    (val) => {
      if (val === undefined || val === null) return '';
      return typeof val === 'string' ? val.trim() : String(val).trim();
    },
    z.string()
      .min(1, 'Organisation is required')
      .min(2, 'Organisation name must be at least 2 characters')
      .max(200, 'Organisation name must be less than 200 characters')
  ),
  need: z.preprocess(
    (val) => {
      if (val === undefined || val === null) return '';
      return typeof val === 'string' ? val.trim() : String(val).trim();
    },
    z.string()
      .min(1, 'Please describe what you need')
      .min(10, 'Description must be at least 10 characters')
      .max(5000, 'Description must be less than 5000 characters')
  ),
});

export type PartnershipFormData = z.infer<typeof partnershipSchemaWithPreprocess>;

