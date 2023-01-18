export default function LanguageFilterLanguage({name, count}: { name: string, count: number }) {
  return (
    <span className="bg-[#161b22] hover:bg-[#191e25] text-gray-300 px-2 py-1 rounded space-x-2 cursor-pointer text-sm">
      <span>{name}</span>
      <span className="text-gray-500">{count}</span>
    </span>
  )
}