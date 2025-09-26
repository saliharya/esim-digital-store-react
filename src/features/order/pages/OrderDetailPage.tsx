import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/product/Header";
import { ScrollArea } from "@/components/ui/scroll-area";

const products = [
    {
        id: 1,
        name: "eSIM Singapore",
        coverage: "Singapore",
        dataSizes: ["3GB", "5GB", "10GB", "15GB"],
        days: [7, 14, 24, 30],
    },
];

export default function OrderDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    if (!product) {
        return <div className="p-4">Produk tidak ditemukan</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-primary">
            <div className="pt-8 text-white px-4">
                <Header
                    title="Detail Pemesanan"
                    showStepper={true}
                    steps={["Checkout", "Invoice"]}
                    currentStep={0}
                />
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-4xl h-[90vh] flex flex-col">
                <ScrollArea className="flex-1 px-4 py-6 text-gray-600">
                    <div>
                        <h2 className="font-bold text-lg mb-2 text-black">
                            Ringkasan Paket
                        </h2>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span>Paket Terpilih</span>
                                <span>{product.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Data Tersedia</span>
                                <span>{product.dataSizes[0]}</span>
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

                    <div className="mt-6 space-y-4">
                        <h2 className="font-bold text-lg text-black">Data Pelanggan</h2>

                        <div>
                            <label className="block text-sm font-medium mb-1">Nama</label>
                            <input
                                type="text"
                                placeholder="Masukan Nama Pelanggan"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <p className="text-xs mt-1">
                                Jika terjadi kendala, kami akan menghubungi ke nomor ini
                            </p>
                        </div>
                    </div>
                </ScrollArea>

                <div className="px-4 py-3 border-t">
                    <button className="w-full bg-blue-800 text-white py-3 rounded-full font-semibold my-4" onClick={() => navigate(`/products/${product.id}/paymentmethod`)}>
                        Lanjutkan
                    </button>
                </div>
            </div>
        </div >
    );
}
