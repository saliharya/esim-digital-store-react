import Header from "@/components/product/Header";
import ItemCard from "@/components/product/ItemCard";
import SearchBar from "@/components/product/SearchBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ListPage() {

    const products = [
        {
            name: "eSIM Singapore",
            imgUrl: "src/assets/image.png",
            region: "Region Asia",
            category: "Instant",
            iconCategory: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
            price: 69000,
        },
        {
            name: "eSIM Indonesia",
            imgUrl: "src/assets/image.png",
            region: "Region Asia",
            category: "Topupable",
            iconCategory: "https://cdn-icons-png.flaticon.com/512/1828/1828859.png",
            price: 52000,
        },
        {
            name: "eSIM USA",
            imgUrl: "src/assets/image.png",
            region: "Region America",
            category: "Instant",
            iconCategory: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
            price: 120000,
        },
        {
            name: "eSIM South Korea",
            imgUrl: "src/assets/image.png",
            region: "Region Asia",
            category: "Topupable",
            iconCategory: "https://cdn-icons-png.flaticon.com/512/1828/1828859.png",
            price: 80000,
        },
    ];

    return (
        <div className="flex flex-col h-screen">
            <div className="py-8 px-4 space-y-4 text-white bg-primary">
                <div className="pt-4">
                    <Header />
                </div>

                <div className="pt-4">
                    <SearchBar />
                </div>

                <div className="flex justify-between gap-2">
                    <Select>
                        <SelectTrigger className="w-[180px] text-white data-[placeholder]:text-white">
                            <SelectValue placeholder="Semua Region" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-[180px] text-white data-[placeholder]:text-white">
                            <SelectValue placeholder="Semua Jenis" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Scroll area untuk card */}
            <ScrollArea className="flex-1 px-3 bg-white rounded-t-4xl overflow-y-auto">
                <div className="grid grid-cols-2 gap-2 py-4">
                    {products.map((p, i) => (
                        <ItemCard key={i} {...p} />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
