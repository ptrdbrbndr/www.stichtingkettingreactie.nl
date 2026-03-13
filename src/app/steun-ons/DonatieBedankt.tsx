"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

function DonatieBedanktInner() {
  const searchParams = useSearchParams();
  const isDonatieBedankt = searchParams.get("donatie") === "bedankt";

  if (!isDonatieBedankt) return null;

  return (
    <div className="bg-green-50 py-6">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <CheckCircle className="h-6 w-6 shrink-0 text-green-600" />
        <div>
          <p className="font-semibold text-green-800">
            Hartelijk dank voor uw donatie!
          </p>
          <p className="text-sm text-green-700">
            Uw bijdrage gaat volledig naar onze projecten voor kansarme vrouwen
            in India.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DonatieBedankt() {
  return (
    <Suspense fallback={null}>
      <DonatieBedanktInner />
    </Suspense>
  );
}
