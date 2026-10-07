import React from 'react';

function SkeletonBlock({
  className = '',
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-lg shimmer-bg ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

function SkeletonCard() {
  return (
    <div className="card-base p-6 space-y-3">
      <SkeletonBlock className="h-4 w-1/3" />
      <SkeletonBlock className="h-5 w-3/4" />
      <SkeletonBlock className="h-4 w-full" />
      <SkeletonBlock className="h-4 w-5/6" />
      <div className="flex gap-2 pt-2">
        <SkeletonBlock className="h-5 w-14" />
        <SkeletonBlock className="h-5 w-16" />
        <SkeletonBlock className="h-5 w-12" />
      </div>
    </div>
  );
}

export default function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-bg-primary" aria-label="Loading portfolio" role="status">
      {/* Skeleton Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/[0.04] flex items-center px-6">
        <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="w-8 h-8 rounded-lg" />
            <SkeletonBlock className="h-4 hidden sm:block" style={{ width: 112 }} />
          </div>
          <div className="hidden md:flex gap-4">
            {[80, 90, 100, 70, 110, 75].map((w, i) => (
              <SkeletonBlock key={i} className="h-3.5" style={{ width: w }} />
            ))}
          </div>
          <SkeletonBlock className="h-9 w-20 rounded-lg" />
        </div>
      </div>

      {/* Skeleton Hero */}
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="max-w-3xl space-y-5">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-px w-12" />
            <SkeletonBlock className="h-3 w-36" />
          </div>
          <SkeletonBlock className="h-16" style={{ width: 288 }} />
          <SkeletonBlock className="h-12" style={{ width: 192 }} />
          <SkeletonBlock className="h-5 mt-2" style={{ width: 320 }} />
          <SkeletonBlock className="h-4 w-full max-w-xl" />
          <SkeletonBlock className="h-4 w-5/6 max-w-lg" />
          <div className="flex gap-3 mt-8">
            <SkeletonBlock className="h-11 rounded-lg" style={{ width: 144 }} />
            <SkeletonBlock className="h-11 rounded-lg" style={{ width: 128 }} />
          </div>
          <div className="flex gap-2 mt-4">
            {[90, 100, 90, 110].map((w, i) => (
              <SkeletonBlock key={i} className="h-8 rounded-lg" style={{ width: w }} />
            ))}
          </div>
        </div>
      </div>

      {/* Skeleton section blocks */}
      <div className="bg-bg-secondary py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <SkeletonBlock className="h-4 w-20 mb-2" />
          <SkeletonBlock className="h-9 w-64" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <SkeletonBlock className="h-4 w-24 mb-2" />
          <SkeletonBlock className="h-9 w-56" />
          <div className="space-y-4 mt-8">
            {[0, 1, 2].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Screen reader text */}
      <span className="sr-only">Loading Mella Melissa's portfolio...</span>
    </div>
  );
}
