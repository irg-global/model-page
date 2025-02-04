import { useState, useRef } from "react";
import { gsap } from "gsap";

const RightSidebar = () => {
  const [activeTab, setActiveTab] = useState("boxInfo");
  const containerRef = useRef(null);
  const [sectionShow, setSectionShow] = useState(true);

  const handleTabChange = (tab) => {
    if (activeTab !== tab) {
      const tl = gsap.timeline();
      tl.to(containerRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.4,
        onComplete: () => setActiveTab(tab),
      });
      tl.to(containerRef.current, { opacity: 1, x: 0, duration: 0.4 });
    }
  };

  return (
    <div className="retaive md:fixed w-96 top-32 right-3">
      <div className="w-full flex justify-center">
        <div
          onClick={() => {
            setSectionShow(!sectionShow);
          }}
          className="cursor-pointer absolute -top-6 -right-12 transform -translate-x-1/2 w-60 bg-gradient-to-r from-orange-500 to-yellow-500 py-4 text-center text-white font-bold rounded shadow-md hover:shadow-orange-400/80 hover:scale-105 transition-all duration-300 z-50"
        >
          <h2>CUSTOMIZE & CHECK PRICES</h2>
        </div>
      </div>
      <div
        className={`p-4 ${sectionShow ? "bg-gray-200" : ""} rounded`}
        style={{ maxHeight: "600px", overflowY: "auto" }}
      >
        <div className={`${sectionShow ? "block" : "hidden"}`}>
          {/* Tab Buttons */}
          <div className="flex gap-4 my-6">
            <button
              className={`px-4 py-2 text-white rounded-md ${
                activeTab === "boxInfo"
                  ? "bg-gradient-to-r from-orange-300 to-orange-900 text-white rounded-md shadow-md hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105"
                  : "bg-gray-400"
              }`}
              onClick={() => handleTabChange("boxInfo")}
            >
              Box Info
            </button>
            <button
              className={`px-4 py-2 text-white rounded-md ${
                activeTab === "creativeTools"
                  ? "bg-gradient-to-r from-orange-300 to-orange-900 text-white rounded-md shadow-md hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105"
                  : "bg-gray-400"
              }`}
              onClick={() => handleTabChange("creativeTools")}
            >
              Creative Tools
            </button>
          </div>

          {/* Content Section */}
          <div ref={containerRef} className="w-full h-auto">
            {activeTab === "boxInfo" && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4">Box Info</h3>
                <form className="flex flex-col">
                  <div className="flex flex-wrap gap-1">
                    <div>
                      <label className="block mb-1 font-medium">Box Type</label>
                      <select className="w-full p-2 border-2 rounded-md">
                        <option>Mailer Box</option>
                        <option>Rigid Box</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Box Size</label>
                      <select
                        name="dimensions"
                        id="dimensions"
                        className="w-full p-2 border-2 rounded-md"
                      >
                        <option selected="">Choose...</option>
                        <option value="3x3x4">3"x3"x4"</option>
                        <option value="8x8x3">8"x8"x3"</option>
                        <option value="10x10x5">10"x10"x5"</option>
                        <option value="13.1x10.1x3.3">13.1"x10.1"x3.3"</option>
                        <option value="12x12x10">12"x12"x10"</option>
                        <option value="16x24x12">16"x24"x12"</option>
                        <option value="18x24x12">18"x24"x12"</option>
                        <option value="16x20x15">16"x20"x15"</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Material</label>
                      <select
                        id="material"
                        name="material"
                        className="w-full p-2 border-2 rounded-md"
                      >
                        <option selected="">Choose...</option>
                        <option>Corrugated Card Stock</option>
                        <option>Kraft Card Stock</option>
                        <option>Foil Card Stock </option>
                        <option>Textured Card Stock</option>
                        <option>White Card Stock</option>
                        <option>Colored Stock</option>
                        <option>Rigid Boxes</option>
                        <option>None</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full flex justify-center py-2">
                    <p className="text-red-800 font-semibold text-sm">
                      ---------- Enter Interior Dimensions ----------
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <div>
                      <label className="block mb-1 font-medium">Width</label>
                      <input
                        type="number"
                        className="w-24 p-2 border-2 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Height</label>
                      <input
                        type="number"
                        className="w-24 p-2 border-2 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Length</label>
                      <input
                        type="number"
                        className="w-24 p-2 border-2 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">Quantity</label>
                      <input
                        type="number"
                        className="w-24 p-2 border-2 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">
                        Lamination
                      </label>
                      <select
                        id="coating_lamination"
                        name="coating_lamination"
                        className="p-2 border-2 rounded-md"
                      >
                        <option selected="">Choose...</option>
                        <option>Glossy Lamination</option>
                        <option>Matte Lamination</option>
                        <option>Soft Touch / Silk Touch Coating</option>
                        <option>Anti Scratch Coating</option>
                        <option>UV Coating</option>
                        <option>Aqueous Coating</option>
                        <option>Varnish</option>
                        <option>Spot Gloss UV</option>
                        <option>None</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">
                        Printing Sides
                      </label>
                      <select
                        id="printing_sides"
                        name="printing_sides"
                        className="p-2 border-2 rounded-md"
                      >
                        <option selected="">Choose...</option>
                        <option>Outside Only</option>
                        <option>Inside Only</option>
                        <option>Both Sides</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">
                        Card Thickness
                      </label>
                      <select
                        id="card_thickness"
                        name="card_thickness"
                        className="p-2 border-2 rounded-md"
                      >
                        <option selected="">Choose...</option>
                        <option>11 pt 230 GSM</option>
                        <option>12 pt 250 GSM</option>
                        <option>13 pt 270 GSM</option>
                        <option>13 pt 270 GSM</option>
                        <option>14 pt 300 GSM</option>
                        <option>18 pt 350 GSM</option>
                        <option>24 pt 460 GSM</option>
                        <option>800 GSM</option>
                        <option>1000 GSM</option>
                        <option>1200 GSM</option>
                        <option>1400 GSM</option>
                        <option>1600 GSM</option>
                        <option>E-flute</option>
                        <option>B-flute</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full flex justify-end mt-2">
                    <button
                      className="text-white py-2 w-32 rounded-md bg-gradient-to-r from-orange-300 to-orange-900 shadow-md hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("creativeTools");
                      }}
                    >
                      Proceed
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "creativeTools" && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-4">Creative Tools</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    "Front Side",
                    "Back Side",
                    "Top Area",
                    "Bottom Area",
                    "Left Side",
                    "Right Side",
                  ].map((side, index) => (
                    <button
                      key={index}
                      className="w-full p-2 bg-gray-200 hover:bg-orange-300 text-center rounded-md"
                    >
                      {side}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex justify-center flex-wrap gap-4">
                  <button className="px-4 py-2 bg-gradient-to-r from-orange-300 to-orange-900 text-white rounded-md shadow-md hover:shadow-orange-500/80 transition-all duration-300 hover:scale-105">
                    Start Rotation
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-red-300 to-red-900 text-white rounded-md shadow-md hover:shadow-red-500/80 transition-all duration-300 hover:scale-105">
                    Stop Rotation
                  </button>
                  <button className="px-8 py-2 bg-gradient-to-r from-green-300 to-green-900 text-white rounded-md shadow-md hover:shadow-green-500/80 transition-all duration-300 hover:scale-105">
                    Proceed
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
