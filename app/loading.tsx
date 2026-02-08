import LoadingNepX from "@/components/ui/LoadingNepX";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <LoadingNepX size="lg" />
    </div>
  );
}
