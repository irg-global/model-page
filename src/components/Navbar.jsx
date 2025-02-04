// Navbar Component
function Navbar() {
    return (
      <div className="flex justify-between items-center p-4 bg-gray-300 shadow-lg border-b border-gray-300">
        {/* Add your navbar logo here */}
        <div>
          <img src="https://www.customizedboxpackaging.com/assets/images/logo.webp" alt="logo" className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200" />
        </div>
  
        {/* Add your back button here */}
        <button className="bg-[#00673c] text-white px-6 py-2 rounded">⬅ Back</button>
      </div>
    );
  }

export default Navbar;