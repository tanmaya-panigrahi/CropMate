export default function MobileBottomNav({ className = "" }) {
  const iconList = ["🏠", "📷", "📜", "🌾", "💬"];

  return (
    <nav
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50
      bg-[#103713]/90 text-[#FFFDF5]
      flex justify-around items-center px-6 py-2
      rounded-full shadow-xl backdrop-blur-md 
      w-[90%] max-w-md ${className}`}
    >
      {iconList.map((icon, i) => (
        <button
          key={i}
          className="relative flex items-center justify-center w-10 h-10
          rounded-full bg-[#FFFDF5]/10 text-xl hover:bg-[#FFFDF5]/20 transition
          before:content-[''] before:absolute before:w-14 before:h-14
          before:rounded-full before:bg-[#FFFDF5]/10 before:blur-lg before:-z-10"
        >
          {icon}
        </button>
      ))}
    </nav>
  );
}
