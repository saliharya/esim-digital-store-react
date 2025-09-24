import { Search } from "lucide-react"
import { Input } from "../ui/input"

export default function SearchBar() {
    return (
        <div className="relative flex-1">
            <Input
                type="text"
                placeholder="Cari Produk yang Anda Mau"
                className="px-4 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0 border-0 bg-primary-foreground/10 py-6"
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground" />
        </div>
    )
}
