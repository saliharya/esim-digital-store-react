import Header from "@/components/product/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function InvoicePage() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const {
        product,
        selectedSize,
        selectedDay,
        name,
        email,
        whatsapp,
        paymentMethod,
        price = 500000,
        transactionFee = 2500,
    } = state || {};

    if (!product) {
        return <div className="p-4">Produk tidak ditemukan</div>;
    }

    // Generate nomor invoice random
    const invoiceNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;

    const total = price + transactionFee;

    return (
        <div className="flex flex-col h-screen bg-primary">
            <div className="pt-8 text-white px-4">
                <Header
                    title="Invoice"
                    showStepper={true}
                    steps={["Checkout", "Invoice"]}
                    currentStep={1}
                />
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-4xl h-[90vh] flex flex-col">
                <ScrollArea className="flex-1 text-gray-700 overflow-y-auto">
                    <div className="px-4 py-6">

                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <CheckCircle2 className="w-16 h-16 text-green-500" />
                            </div>
                            <h1 className="text-2xl font-bold text-primary">
                                Rp{total.toLocaleString("id-ID")}
                            </h1>
                            <p className="text-sm text-gray-500">{invoiceNumber}</p>
                        </div>

                        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Status</span>
                                <span className="text-green-600 font-semibold">Berhasil</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tgl Transaksi</span>
                                <span>{new Date().toLocaleDateString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Waktu Transaksi</span>
                                <span>{new Date().toLocaleTimeString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Metode Pembayaran</span>
                                <span>{paymentMethod}</span>
                            </div>
                        </div>

                        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
                            <h2 className="font-bold text-base text-black">Detail Transaksi</h2>
                            <div className="flex justify-between">
                                <span>Produk</span>
                                <span>{product.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Data Tersedia</span>
                                <span>{selectedSize}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Durasi</span>
                                <span>{selectedDay} hari</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Nama Pelanggan</span>
                                <span>{name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Nomor Whatsapp</span>
                                <span>{whatsapp}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Email</span>
                                <span>{email}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Kami akan segera mengirimkan kode QR eSIM ke email Anda.
                                Cek inbox (atau folder spam) ya!
                            </p>
                        </div>

                        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
                            <h2 className="font-bold text-base text-black">Detail Pembayaran</h2>
                            <div className="flex justify-between">
                                <span>Harga</span>
                                <span>Rp{price.toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Biaya Transaksi</span>
                                <span>Rp{transactionFee.toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>Rp{total.toLocaleString("id-ID")}</span>
                            </div>
                        </div>

                        <div className="px-4 py-3 border-t">
                            <button
                                onClick={() => navigate("/")}
                                className="w-full bg-blue-800 text-white py-3 rounded-full font-semibold my-4"
                            >
                                Selesai
                            </button>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
