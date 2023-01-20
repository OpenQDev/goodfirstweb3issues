import LanguageFilter from "./LanguageFilter";

export default function TheSidebar() {
  return (
    <aside className="p-4 lg:max-w-sm">
      <h3>About</h3>
      <p className="mt-2">
        This is a Web3 version of <a href="https://goodfirstissue.dev/" target="_blank" rel="noreferrer">goodfirstissue.dev</a>, with a focus on Web3 projects.
      </p>
      <h3 className="mt-9">languages</h3>
      <LanguageFilter />
      <button className="w-full mt-10">
        Add Repository
      </button>
      <p className="text-gray-600 text-center mt-16 opacity-50">
        an <a href="https://openq.dev" target="_blank" rel="noreferrer">OpenQ</a> initiative
      </p>
    </aside>
  );
}