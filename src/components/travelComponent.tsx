import { Plane, Car, Bed } from "lucide-react";
export default function TravelPage() {
  return (
    <div className="flex items-center justify-center h-screen overflow-auto">
      <div className={`text-center`}>
        <h1 className="text-3xl font-bold text-[#E3194B] mb-10">
          Travel Bookings Coming Soon!
        </h1>
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex flex-col items-center">
            <Plane
              className="w-12 h-12 mb-2 animate-bounce"
              style={{ color: "#F28500", animationDelay: "0s" }} // Tangerine orange for icons
            />
            <span className="text-xl" style={{ color: "#20B2AA" }}>
              {" "}
              {/* Blue-green for labels */}
              Flights
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Car
              className="w-12 h-12 mb-2 animate-bounce"
              style={{ color: "#F28500", animationDelay: "0.2s" }}
            />
            <span className="text-xl" style={{ color: "#20B2AA" }}>
              Cabs
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Bed
              className="w-12 h-12 mb-2 animate-bounce"
              style={{ color: "#F28500", animationDelay: "0.4s" }}
            />
            <span className="text-xl" style={{ color: "#20B2AA" }}>
              Hotels
            </span>
          </div>
        </div>
        <p className="mx-auto">
          We're working hard to bring you the best travel booking experience.
          Soon you'll be able to book flights, cabs, and hotels all in one
          place!
        </p>
      </div>
    </div>
  );
}











