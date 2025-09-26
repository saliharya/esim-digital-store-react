import Header from "@/components/product/Header";
import ItemCard from "@/components/product/ItemCard";
import SearchBar from "@/components/product/SearchBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Sheet } from "react-modal-sheet";
import { getProducts } from "@/services/product/productService";

function BottomSheetSelect({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: string[];
    value: string | null;
    onChange: (val: string | null) => void;
}) {
    const [isOpen, setOpen] = useState(false);

    const handleSelect = (val: string) => {
        onChange(val);
        setOpen(false);
    };

    const handleReset = () => {
        onChange(null);
        setOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="w-[180px] px-3 py-2 border rounded-md text-left text-white bg-primary"
            >
                {value || label}
            </button>

            <Sheet isOpen={isOpen} onClose={() => setOpen(false)} detent="content" snapPoints={[0, 0.8, 1]}>
                <Sheet.Container>
                    <Sheet.Header>
                        <div className="flex items-center justify-between px-4 py-3 border-b">
                            <h2 className="text-lg font-semibold">{label}</h2>
                            <button
                                onClick={handleReset}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Reset
                            </button>
                        </div>
                    </Sheet.Header>
                    <Sheet.Content>
                        <div className="p-4 space-y-3">
                            {options.map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center space-x-2 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name={label}
                                        value={opt}
                                        checked={value === opt}
                                        onChange={() => handleSelect(opt)}
                                    />
                                    <span>{opt}</span>
                                </label>
                            ))}
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onTap={() => setOpen(false)} />
            </Sheet>
        </>
    );
}

export default function ListPage() {

    const products = getProducts();

    const [region, setRegion] = useState<string | null>(null);
    const [jenis, setJenis] = useState<string | null>(null);

    const filteredProducts = products.filter((p) => {
        const matchRegion = region ? p.region === region : true;
        const matchJenis = jenis ? p.category === jenis : true;
        return matchRegion && matchJenis;
    });

    return (
        <div className="flex flex-col h-screen">
            <div className="py-8 px-4 space-y-4 text-white bg-primary">
                <div className="pt-4">
                    <Header title="Travel eSIM" />
                </div>

                <div className="pt-4">
                    <SearchBar />
                </div>

                <div className="flex justify-between gap-2">
                    <BottomSheetSelect
                        label="Semua Region"
                        options={["Asia", "Eropa", "Oseania", "Amerika", "Afrika"]}
                        value={region}
                        onChange={setRegion}
                    />

                    <BottomSheetSelect
                        label="Semua Jenis"
                        options={["Instant", "Topupable"]}
                        value={jenis}
                        onChange={setJenis}
                    />
                </div>
            </div>

            <ScrollArea className="flex-1 px-3 bg-white rounded-t-4xl overflow-y-auto">
                {filteredProducts.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                        No data available
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-2 py-4">
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
