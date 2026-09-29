export default function InternshipCardSkeleton() {
  return (
    <div className="bg-surface border border-border p-6 flex flex-col h-full animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-4">
          <div className="h-4 bg-border w-24 mb-2"></div>
          <div className="h-6 bg-border w-48 mb-2"></div>
          <div className="h-4 bg-border w-32"></div>
        </div>
        <div className="w-12 h-12 bg-border shrink-0"></div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="h-6 bg-border w-20"></div>
        <div className="h-6 bg-border w-24"></div>
        <div className="h-6 bg-border w-16"></div>
      </div>

      <div className="mt-auto">
        {/* Metadata */}
        <div className="grid grid-cols-2 gap-y-2 text-sm mb-6">
          <div className="h-4 bg-border w-16"></div>
          <div className="h-4 bg-border w-20"></div>
          <div className="h-4 bg-border w-24"></div>
        </div>

        {/* Action */}
        <div className="h-10 bg-border w-full border-2 border-border"></div>
      </div>
    </div>
  );
}
