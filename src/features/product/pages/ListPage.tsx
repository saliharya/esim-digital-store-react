import Header from "@/components/product/Header";
import ItemCard from "@/components/product/ItemCard";
import SearchBar from "@/components/product/SearchBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/product/productService";
import BottomSheetSelect from "@/components/product/BottomSheetSelect";
import DropdownSelect from "@/components/product/DropdownSelect";
import type { Product } from "@/services/product/product";

export default function ListPage() {

    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const [region, setRegion] = useState<string | null>(null);
    const [jenis, setJenis] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredProducts = products.filter((p) => {
        const matchRegion = region ? p.region === region : true;
        const matchJenis = jenis ? p.category === jenis : true;
        const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchRegion && matchJenis && matchSearch;
    });

    const regionOptions = ["Asia", "Eropa", "Oseania", "Amerika", "Afrika"];
    const jenisOptions = ["Instant", "Topupable"];

    return (
        <div className="flex flex-col h-screen">
            <div className="py-8 px-4 space-y-4 text-white bg-primary">
                <Header title="Travel eSIM" />

                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                    <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                    <div className="flex justify-between gap-2">
                        <div className="lg:hidden">
                            <BottomSheetSelect
                                label="Semua Region"
                                options={regionOptions}
                                value={region}
                                onChange={setRegion}
                            />
                        </div>
                        <div className="lg:hidden">
                            <BottomSheetSelect
                                label="Semua Jenis"
                                options={jenisOptions}
                                value={jenis}
                                onChange={setJenis}
                            />
                        </div>

                        <div className="hidden lg:block">
                            <DropdownSelect
                                label="Semua Region"
                                options={regionOptions}
                                value={region}
                                onChange={setRegion}
                            />
                        </div>
                        <div className="hidden lg:block">
                            <DropdownSelect
                                label="Semua Jenis"
                                options={jenisOptions}
                                value={jenis}
                                onChange={setJenis}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ScrollArea className="flex-1 px-3 bg-white rounded-t-4xl lg:rounded-none overflow-y-auto">
                {filteredProducts.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">No data available</div>
                ) : (
                    <div className="grid grid-cols-2 gap-3 py-4 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6">
                        {filteredProducts.map((p) => (
                            <Link key={p.id} to={`/products/${p.id}`}>
                                <ItemCard
                                    image={p.images[0]}
                                    name={p.name}
                                    region={p.region}
                                    category={p.category}
                                    price={p.price}
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}
