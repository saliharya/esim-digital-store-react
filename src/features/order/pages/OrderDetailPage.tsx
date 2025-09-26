import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/product/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getProductById } from "@/services/product/productService";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function OrderDetailPage() {
    const navigate = useNavigate();
    const query = useQuery();
    const selectedSize = query.get("size");
    const selectedDay = query.get("days");
    const { id } = useParams();
    const product = getProductById(Number(id));
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    if (!product) {
        return <div className="p-4">Produk tidak ditemukan</div>;
    }

    const handleContinue = () => {
        navigate(`/products/${product.id}/paymentmethod`, {
            state: {
                product,
                selectedSize: selectedSize || product.dataSizes[0],
                selectedDay: selectedDay || product.days[0],
                name,
                email,
                whatsapp,
                price: product.price,
                transactionFee: 2500,
            },
        });
    };

    return (
        <div className="flex flex-col h-screen bg-primary lg:bg-gray-100 lg:justify-center lg:items-center">
            <div className="lg:w-[500px] lg:h-auto lg:min-h-[650px] lg:max-h-[90vh] lg:rounded-2xl lg:shadow-2xl lg:overflow-hidden lg:bg-white lg:flex lg:flex-col">
                <div className="pt-8 text-white px-4 lg:px-6 lg:bg-primary lg:h-20 lg:flex lg:items-center lg:justify-between">
                    <div className="lg:flex-1">
                        <Header
                            title="Detail Pemesanan"
                            showStepper={true}
                            steps={["Checkout", "Invoice"]}
                            currentStep={0}
                        />
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-4xl h-[90vh] flex flex-col
                            lg:static lg:h-auto lg:rounded-t-none lg:flex-1">

                    <ScrollArea className="flex-1 px-4 py-6 text-gray-600 lg:px-6 lg:py-8">

                        <div>
                            <h2 className="font-bold text-lg mb-3 text-black lg:text-xl lg:mb-4">
                                Ringkasan Paket
                            </h2>
                            <div className="space-y-2 text-sm lg:text-base p-4 border rounded-xl bg-gray-50">
                                <div className="flex justify-between">
                                    <span className="font-medium">Paket Terpilih</span>
                                    <span className="font-semibold text-blue-800">{product.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Data Tersedia</span>
                                    <span>{selectedSize || product.dataSizes[0]}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tanggal Pesanan</span>
                                    <span>{new Date().toLocaleDateString("id-ID")}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Jumlah</span>
                                    <span>1</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-5">
                            <h2 className="font-bold text-lg text-black lg:text-xl">Data Pelanggan</h2>

                            <div>
                                <label className="block text-sm font-medium mb-1">Nama</label>
                                <input
                                    type="text"
                                    placeholder="Masukan Nama Pelanggan"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Alamat Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Masukan Email Pelanggan"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nomor Whatsapp
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Masukan Nomor HP Pelanggan"
                                    value={whatsapp}
                                    onChange={(e) => setWhatsapp(e.target.value)}
                                    className="w-full border rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                                <p className="text-xs mt-1 text-gray-500">
                                    Jika terjadi kendala, kami akan menghubungi ke nomor ini
                                </p>
                            </div>
                        </div>
                    </ScrollArea>

                    <div className="px-4 py-4 border-t lg:px-6 lg:py-6 lg:shadow-t-md">
                        <button
                            className="w-full bg-blue-800 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
                            onClick={handleContinue}
                        >
                            Lanjutkan
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}
