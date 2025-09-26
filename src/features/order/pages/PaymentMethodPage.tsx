import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/product/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import PaymentMethods from "@/components/order/PaymentMethods";
import { ArrowLeft } from "lucide-react";

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
        price,
        transactionFee,
    } = state || {};

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>("saldo");

    if (!product) {
        return <div className="p-4">Produk tidak ditemukan</div>;
    }

    const totalAmount = price + transactionFee;

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
                price,
                transactionFee
            },
        });
    };

    const OrderSummary = ({ hideBorder = false }) => (
        <div className={`space-y-2 text-sm lg:text-base ${!hideBorder ? "border-t pt-4 mt-6" : ""}`}>
            <h2 className="font-bold text-lg mb-2 text-black lg:text-xl">
                Ringkasan Paket
            </h2>
            <div className="space-y-1 text-sm lg:text-base p-4 border rounded-xl bg-gray-50">
                <div className="flex justify-between">
                    <span className="font-medium">Paket Terpilih</span>
                    <span className="font-semibold">{product.name}</span>
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
    );

    const TotalAndCTA = () => (
        <>
            <div className="space-y-1 text-sm px-4 py-3 text-gray-500 lg:px-0 lg:pt-0 lg:pb-4 lg:bg-white">
                <div className="flex justify-between">
                    <span>Harga Paket</span>
                    <span className="font-bold">Rp{price.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                    <span>Biaya Layanan</span>
                    <span className="font-bold">Rp{transactionFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t mt-2">
                    <span className="font-extrabold text-black text-base lg:text-lg">Total Pembayaran</span>
                    <span className="text-primary font-extrabold text-base lg:text-lg">Rp{totalAmount.toLocaleString('id-ID')}</span>
                </div>
            </div>

            <div className="px-4 py-3 border-t lg:px-0 lg:py-0">
                <button
                    className="w-full bg-blue-800 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition"
                    onClick={handleCheckout}
                >
                    Bayar Sekarang
                </button>
            </div>
        </>
    );

    return (
        <div className="flex flex-col h-screen bg-primary lg:bg-gray-100 lg:justify-center lg:items-center">

            <div className="lg:hidden flex items-center gap-3 pt-8 px-4 text-white">
                <div className="flex-1 flex flex-col gap-2">
                    <Header
                        title="Metode Pembayaran"
                        showStepper={true}
                        steps={["Checkout", "Invoice"]}
                        currentStep={1}
                    />
                </div>
            </div>

            <div className="lg:flex lg:w-[80vw] lg:max-w-6xl lg:min-h-[700px] lg:h-[90vh] lg:rounded-2xl lg:shadow-2xl lg:overflow-hidden lg:bg-white">

                <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-4xl h-[90vh] flex flex-col
                    lg:static lg:h-full lg:flex-1 lg:w-3/5 lg:rounded-t-none lg:border-r lg:p-8">

                    <div className="hidden lg:flex lg:items-center lg:justify-between lg:pb-6 lg:border-b lg:mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>

                        <div className="flex-1 flex flex-col gap-2 ml-4">
                            <Header
                                title="Metode Pembayaran"
                                showStepper={true}
                                steps={["Checkout", "Invoice"]}
                                currentStep={1}
                            />
                        </div>
                    </div>

                    <ScrollArea className="flex-1 px-4 py-6 text-gray-600 lg:px-0 lg:py-0 lg:pr-4">
                        <div className="lg:hidden">
                            <OrderSummary />
                        </div>

                        <PaymentMethods selected={paymentMethod} onChange={setPaymentMethod} />
                    </ScrollArea>

                    <div className="lg:hidden">
                        <TotalAndCTA />
                    </div>
                </div>

                <div className="hidden lg:flex lg:w-2/5 lg:flex-col lg:p-8 lg:h-full bg-white">
                    <div className="lg:flex-1">
                        <h2 className="font-extrabold text-2xl text-blue-800 mb-6">Ringkasan Pesanan</h2>
                        <OrderSummary hideBorder={true} />

                        <div className="my-8 border-t border-blue-200"></div>

                        <div className="space-y-3 text-sm">
                            <h3 className="font-bold text-lg text-gray-800">Detail Kontak</h3>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Nama</span>
                                <span className="font-medium text-gray-800">{name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Email</span>
                                <span className="font-medium text-gray-800">{email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">WhatsApp</span>
                                <span className="font-medium text-gray-800">{whatsapp}</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:sticky lg:bottom-0 lg:pt-6">
                        <TotalAndCTA />
                    </div>
                </div>

            </div>
        </div>

    );
}