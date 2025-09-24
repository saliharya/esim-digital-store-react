import { Search } from "lucide-react"
import { Input } from "../ui/input"

export default function SearchBar() {
    return (
        <div className="relative flex-1">
            <Input
                type="text"
                placeholder="Cari Produk yang Anda Mau"
                className="pr-8"
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
    )
}
