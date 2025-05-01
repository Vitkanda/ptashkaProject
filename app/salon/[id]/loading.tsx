import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Back button */}
        <div className="container mt-4">
          <Skeleton className="h-6 w-40" />
        </div>

        {/* Salon Header */}
        <section className="relative py-8">
          <div className="container">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Gallery Skeleton */}
              <Skeleton className="aspect-[4/3] rounded-xl" />

              {/* Salon Info Skeleton */}
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-10 w-3/4 mb-2" />
                  <div className="flex items-center mt-2 gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>

                <Skeleton className="h-20 w-full" />

                <div className="flex gap-4 pt-4">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 flex-1" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section Skeleton */}
        <section className="py-8 border-t">
          <div className="container">
            <div className="w-full">
              <Skeleton className="h-10 w-full mb-6" />
              <div className="space-y-4 pt-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Skeleton */}
      <footer className="bg-gray-900">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Skeleton className="h-8 w-32 bg-gray-800" />
            <div className="flex gap-4">
              <Skeleton className="h-5 w-5 bg-gray-800" />
              <Skeleton className="h-5 w-5 bg-gray-800" />
              <Skeleton className="h-5 w-5 bg-gray-800" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <Skeleton className="h-4 w-60 mx-auto bg-gray-800" />
          </div>
        </div>
      </footer>
    </div>
  )
}
