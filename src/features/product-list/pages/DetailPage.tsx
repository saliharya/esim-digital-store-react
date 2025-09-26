import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { getProductById } from "@/services/product/productService";

export default function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = getProductById(Number(id));

    const [selectedSize, setSelectedSize] = useState(product?.dataSizes[0]);
    const [selectedDay, setSelectedDay] = useState(product?.days[0]);

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    if (!product) {
        return <div className="p-4">Produk tidak ditemukan</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-white">
            <div className="absolute top-4 left-4 z-10">
                <button onClick={() => navigate(-1)} className="rounded-full p-2">
                    <ArrowLeft className="text-white w-5 h-5" />
                </button>
            </div>

            <div className="w-full h-72 bg-gray-200 overflow-hidden relative">
                <Carousel setApi={setApi} className="w-full h-full">
                    <CarouselContent>
                        {product.images.map((src, index) => (
                            <CarouselItem key={index}>
                                <img
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-72 object-cover"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-10">
                    {Array.from({ length: count }).map((_, i) => (
                        <span
                            key={i}
                            className={`h-2 w-2 rounded-full ${i === current ? "bg-blue-700" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </div>
            </div>


            <div className="flex-1 bg-white rounded-t-3xl -mt-6 relative z-10 overflow-hidden">

                <div className="p-4 overflow-y-auto h-full">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-bold">{product.name}</h1>
                            <p className="text-gray-500">{product.region}</p>
                            <div className="flex items-center gap-2 mt-1">
                                {product.category === "Instant" && <Zap className="w-4 h-4 text-yellow-500" />}
                                {product.category === "Topupable" && <Wallet className="w-4 h-4 text-green-500" />}
                                <span className="text-sm">{product.category}</span>
                            </div>
                        </div>
                        <p className="text-lg font-bold text-blue-800">
                            Rp{product.price.toLocaleString()}
                        </p>
                    </div>

                    <div className="mt-4 border rounded-xl p-3">
                        <p className="font-medium">Cakupan negara</p>
                        <p className="text-gray-600">{product.coverage}</p>
                    </div>

                    <div className="mt-4">
                        <p className="font-medium">Ukuran Data</p>
                        <div className="flex gap-2 mt-2">
                            {product.dataSizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedSize === size
                                        ? "bg-blue-700 text-white"
                                        : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="font-medium">Pilih Jumlah Hari</p>
                        <div className="flex gap-2 mt-2">
                            {product.days.map((day) => (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedDay === day
                                        ? "bg-blue-700 text-white"
                                        : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="font-medium mb-2">Deskripsi</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            {product.description.map((d, i) => (
                                <li key={i}>{d}</li>
                            ))}
                        </ul>
                    </div>

                    <button
                        onClick={() =>
                            navigate(`/products/${product.id}/order?size=${selectedSize}&days=${selectedDay}`)
                        }
                        className="w-full bg-blue-700 text-white rounded-xl py-3 font-semibold my-4"
                    >
                        Pesan Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
}
