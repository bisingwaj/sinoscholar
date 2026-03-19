import { Loader2 } from "lucide-react";

export default function AdminSkeleton() {
  return (
    <div className="p-8 md:p-12 h-full w-full bg-white font-sans flex flex-col">
      {/* Header */}
      <div className="mb-12 border-b border-gray-200 pb-6 flex justify-between items-end animate-pulse">
        <div className="w-1/2">
           <div className="h-12 bg-gray-200 w-3/4 mb-3"></div>
           <div className="h-3 bg-gray-100 w-1/2"></div>
        </div>
        <div className="w-1/4 flex flex-col items-end">
           <div className="h-2 bg-gray-100 w-1/3 mb-2"></div>
           <div className="h-4 bg-gray-200 w-1/2"></div>
        </div>
      </div>
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200 mb-8 animate-pulse">
         {[1, 2, 3, 4].map((i) => (
           <div key={i} className="bg-white p-6 flex flex-col justify-between h-32">
             <div className="h-3 bg-gray-100 w-1/2"></div>
             <div className="h-10 bg-gray-200 w-3/4"></div>
           </div>
         ))}
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 animate-pulse">
         {/* Large Block */}
         <div className="lg:col-span-2 border border-gray-200 bg-gray-50 flex items-center justify-center h-[400px]">
           <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
         </div>
         {/* Right Sidebar Block */}
         <div className="border border-gray-200 bg-[#F8F9FA] flex flex-col h-[400px]">
            <div className="p-4 border-b border-gray-200 bg-gray-100 h-14 shrink-0"></div>
            <div className="flex-1 flex flex-col p-4 gap-4">
               {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="w-2/3">
                      <div className="h-4 bg-gray-200 w-full mb-2"></div>
                      <div className="h-2 bg-gray-100 w-1/2"></div>
                    </div>
                    <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
