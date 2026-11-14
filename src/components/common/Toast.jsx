import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useShop();

  if (!toast || !toast.show) return null;

  let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
  let borderColor = "border-emerald-200";
  let bg = "bg-white text-slate-800";

  if (toast.type === "error") {
    icon = <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
    borderColor = "border-rose-200";
    bg = "bg-rose-50 text-rose-900";
  } else if (toast.type === "info") {
    icon = <Info className="w-5 h-5 text-sky-500 shrink-0" />;
    borderColor = "border-sky-200";
    bg = "bg-sky-50 text-sky-900";
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none px-4">
      <div
        className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-xl border ${borderColor} ${bg} text-sm transition-all animate-bounce-subtle`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <div className="font-medium leading-snug">
            {toast.message}
          </div>
        </div>
      </div>
    </div>
  );
}
