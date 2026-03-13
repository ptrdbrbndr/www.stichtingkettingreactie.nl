/**
 * Feature toggles — controlled via environment variables.
 * Add NEXT_PUBLIC_FEATURE_<NAME>=true to .env.local to enable.
 */
export const features = {
  /** Enable Mollie online donation payments */
  mollieDonations:
    process.env.NEXT_PUBLIC_FEATURE_MOLLIE_DONATIONS === "true",
} as const;
