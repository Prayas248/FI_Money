import { PresentationChartLineIcon } from '@heroicons/react/24/outline';

function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="p-5">
            <div className="text-center py-12">
                <PresentationChartLineIcon className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-2 text-lg font-medium text-slate-900">
                    Analytics Coming Soon
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    We're currently building our analytics and reporting features.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                    Check back soon for valuable insights into your inventory!
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
