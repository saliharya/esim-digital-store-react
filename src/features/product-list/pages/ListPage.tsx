import Header from "@/components/product/Header";
import SearchBar from "@/components/product/SearchBar";

export default function ListPage() {
    return (
        <div className="p-4 space-y-4">
            <Header />

            <SearchBar />

            <div className="grid grid-cols-2 gap-4">
                {/* ...map product ke ItemCard */}
            </div>
        </div>
    )
}