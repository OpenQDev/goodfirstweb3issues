export default function TheSidebar() {
  return (
    <aside className="p-4 lg:max-w-sm">
      <h3>About</h3>
      <p>
        Good First Issue curates easy pickings from popular open-source projects, and helps you make your first contribution to open-source.
      </p>
      <h3 className="mt-4">Popular languages</h3>
      <div className="flex flex-wrap mt-3 gap-2">
        {
          ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Go", "Rust"].map((lang) => (
            <span key={ lang } className="bg-[#161b22] hover:bg-[#191e25] text-gray-300 px-2 py-1 rounded space-x-2 cursor-pointer text-sm">
              <span>{ lang }</span>
              <span className="text-gray-500">25</span>
            </span>
          ))
        }
      </div>
      <button className="w-full mt-5">
        Add your project
      </button>
      <p className="text-gray-600 text-center mt-5">
        Made with love by OpenQ
      </p>
    </aside>
  );
}