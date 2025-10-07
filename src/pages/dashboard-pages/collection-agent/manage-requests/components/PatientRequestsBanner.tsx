import {
  FaUserMd,
  FaFlask,
  FaClipboardList,
  FaHeartbeat,
} from "react-icons/fa";

const PatientRequestsBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-800 to-teal-700 rounded-2xl shadow-2xl mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-4 right-4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative px-8 py-12 md:px-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="flex-1 text-white mb-8 lg:mb-0 lg:pr-8">
            <div className="flex items-center mb-4">
              <div className="bg-white/20 p-3 rounded-full mr-4 backdrop-blur-sm border border-white/30">
                <FaClipboardList className="size-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-balance text-white drop-shadow-lg filter contrast-more">
                Patient Requests
                <span className="block text-2xl md:text-3xl font-medium text-white mt-2 drop-shadow-md filter contrast-more">
                  Management
                </span>
              </h1>
            </div>
            <p className="text-xl text-white text-pretty max-w-2xl leading-relaxed drop-shadow-md filter contrast-more">
              Streamline your healthcare workflow with our comprehensive patient
              request management platform. Track, manage, and process lab
              requests efficiently.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-white/40">
                <FaUserMd className="w-4 h-4 mr-2 text-white drop-shadow-sm" />
                <span className="text-sm font-medium text-white drop-shadow-sm filter contrast-more">
                  Patient Management
                </span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-white/40">
                <FaFlask className="w-4 h-4 mr-2 text-white drop-shadow-sm" />
                <span className="text-sm font-medium text-white drop-shadow-sm filter contrast-more">
                  Lab Integration
                </span>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Medical Illustration */}
              <div className="bg-white/15 backdrop-blur-sm p-8 rounded-3xl border-2 border-white/30">
                <div className="grid grid-cols-2 gap-6">
                  {/* Medical Icons */}
                  <div className="bg-white/20 p-6 rounded-2xl flex items-center justify-center border-2 border-white/30">
                    <FaUserMd className="w-12 h-12 text-white drop-shadow-md" />
                  </div>
                  <div className="bg-white/20 p-6 rounded-2xl flex items-center justify-center border-2 border-white/30">
                    <FaFlask className="w-12 h-12 text-white drop-shadow-md" />
                  </div>
                  <div className="bg-white/20 p-6 rounded-2xl flex items-center justify-center border-2 border-white/30">
                    <FaClipboardList className="w-12 h-12 text-white drop-shadow-md" />
                  </div>
                  <div className="bg-white/20 p-6 rounded-2xl flex items-center justify-center border-2 border-white/30">
                    <FaHeartbeat className="w-12 h-12 text-white drop-shadow-md" />
                  </div>
                </div>

                {/* Connecting Lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-full bg-gradient-to-b from-transparent via-white/60 to-transparent"></div>
                  <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white/25 backdrop-blur-sm p-3 rounded-full animate-bounce border-2 border-white/40">
                <div className="w-3 h-3 bg-white rounded-full drop-shadow-sm"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/25 backdrop-blur-sm p-2 rounded-full animate-pulse border-2 border-white/40">
                <div className="w-2 h-2 bg-white rounded-full drop-shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-8 fill-white/10"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default PatientRequestsBanner;
