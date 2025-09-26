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
        <div className="flex flex-col lg:flex-row h-screen bg-white">
            <div className="absolute lg:hidden top-4 left-4 z-10 lg:bg-primary/30 lg:rounded-full">
                <button onClick={() => navigate(-1)} className="rounded-full p-2 backdrop-blur-sm">
                    <ArrowLeft className="text-white w-5 h-5" />
                </button>
            </div>

            <div className="w-full h-72 lg:w-1/2 lg:h-[50vh] lg:mt-24 lg:mx-24 bg-gray-200 overflow-hidden relative lg:rounded-4xl">
                <Carousel setApi={setApi} className="w-full h-full">
                    <CarouselContent>
                        {product.images.map((src, index) => (
                            <CarouselItem key={index}>
                                <img
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-72 lg:h-full object-cover"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="hidden lg:flex absolute top-8 left-8 z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-full p-3 bg-white shadow-lg hover:bg-gray-100 transition"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-800" />
                    </button>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-10 p-2 bg-black/30 rounded-full">
                    {Array.from({ length: count }).map((_, i) => (
                        <span
                            key={i}
                            className={`h-2 w-2 rounded-full ${i === current ? "bg-blue-300" : "bg-gray-100/70"}`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-1 lg:w-1/2 bg-white rounded-t-4xl lg:rounded-t-none -mt-6 lg:mt-0 relative z-10 overflow-hidden">
                <div className="p-4 overflow-y-auto h-full lg:p-10">

                    <div className="flex justify-between items-start mb-6 lg:mb-8 border-b pb-4">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900">{product.name}</h1>
                            <p className="text-gray-500 text-base lg:text-lg">{product.region}</p>
                            <div className="flex items-center gap-2 mt-2">
                                {product.category === "Instant" && <Zap className="w-5 h-5 text-yellow-600" />}
                                {product.category === "Topupable" && <Wallet className="w-5 h-5 text-green-600" />}
                                <span className="text-base font-medium">{product.category}</span>
                            </div>
                        </div>
                        <p className="text-xl lg:text-3xl font-extrabold text-blue-800">
                            Rp{product.price.toLocaleString()}
                        </p>
                    </div>

                    <div className="mt-4 border rounded-xl p-4 bg-blue-50">
                        <p className="font-semibold text-gray-800">Cakupan Negara</p>
                        <p className="text-gray-600 mt-1">{product.coverage}</p>
                    </div>

                    <div className="mt-6 flex flex-col gap-6">
                        <div>
                            <p className="font-semibold text-lg mb-3">Pilih Ukuran Data</p>
                            <div className="flex gap-3 flex-wrap">
                                {product.dataSizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-5 py-2.5 rounded-xl text-base font-medium transition-all ${selectedSize === size
                                            ? "bg-blue-700 text-white shadow-lg shadow-blue-200"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold text-lg mb-3">Pilih Jumlah Hari</p>
                            <div className="flex gap-3 flex-wrap">
                                {product.days.map((day) => (
                                    <button
                                        key={day}
                                        onClick={() => setSelectedDay(day)}
                                        className={`px-5 py-2.5 rounded-xl text-base font-medium transition-all ${selectedDay === day
                                            ? "bg-blue-700 text-white shadow-lg shadow-blue-200"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="font-semibold text-lg mb-3 border-b pb-2">Deskripsi Layanan</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 text-base">
                            {product.description.map((d, i) => (
                                <li key={i}>{d}</li>
                            ))}
                        </ul>
                    </div>

                    <button
                        onClick={() =>
                            navigate(`/products/${product.id}/order?size=${selectedSize}&days=${selectedDay}`)
                        }
                        className="w-full my-8 lg:hidden bg-primary text-white rounded-xl py-4 text-lg font-bold hover:bg-blue-800 transition"
                    >
                        Pesan Sekarang
                    </button>
                </div>

                <div className="lg:sticky lg:bottom-0 lg:left-0 lg:w-full lg:p-8 lg:bg-white lg:border-t lg:shadow-lg">
                    <button
                        onClick={() =>
                            navigate(`/products/${product.id}/order?size=${selectedSize}&days=${selectedDay}`)
                        }
                        className="w-full bg-blue-700 text-white rounded-xl py-4 text-lg font-bold hover:bg-blue-800 transition"
                    >
                        Pesan Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
}
