import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/product/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import PaymentMethods from "@/components/order/PaymentMethods";

type PaymentMethod = "saldo" | "bca" | "mandiri" | "bri";

export default function PaymentMethodPage() {
    const navigate = useNavigate();

    const { state } = useLocation();
    const {
        product,
        selectedSize,
        selectedDay,
        name,
        email,
        whatsapp,
    } = state || {};

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>("saldo");

    if (!product) {
        return <div className="p-4">Produk tidak ditemukan</div>;
    }

    const handleCheckout = () => {
        navigate(`/checkout/${product.id}/invoice`, {
            state: {
                product,
                selectedSize,
                selectedDay,
                name,
                email,
                whatsapp,
                paymentMethod,
            },
        });
    };

    return (
        <div className="flex flex-col h-screen bg-primary">
            <div className="pt-8 text-white px-4">
                <Header
                    title="Metode Pembayaran"
                    showStepper={true}
                    steps={["Checkout", "Invoice"]}
                    currentStep={1}
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

                    <PaymentMethods
                        selected={paymentMethod}
                        onChange={setPaymentMethod}
                    />
                </ScrollArea>

                <div className="space-y-1 text-sm px-4 text-gray-500">
                    <div className="flex justify-between">
                        <span>Harga</span>
                        <span className="font-bold">{product.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Biaya Layanan</span>
                        <span className="font-bold">{product.dataSizes[0]}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-bold">Total</span>
                        <span className="text-primary font-bold">{"Rp32.500"}</span>
                    </div>
                </div>

                <div className="px-4 py-3 border-t">
                    <button className="w-full bg-blue-800 text-white py-3 rounded-full font-semibold my-4" onClick={handleCheckout}>
                        Lanjutkan
                    </button>
                </div>
            </div>
        </div>
    );
}
