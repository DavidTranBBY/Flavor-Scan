import CameraScanner from "@/components/ui/CameraScanner";
export default function DashboardPage() {
    return(
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow w-auto h-auto text-center rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <p className="mb-4">Welcome to your dashboard! Here you can manage your flavors and view analytics.</p>
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold mt-4">Scan</h2>
              <CameraScanner />
          </div>
        </div>
      </section>
    );
}

