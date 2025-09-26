import Header from "@/components/product/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2 } from "lucide-react";

export default function InvoicePage() {
    return (
        <div className="flex flex-col h-screen bg-primary">
            <div className="pt-8 text-white px-4">
                <Header />
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-4xl h-[90vh] flex flex-col">
                <ScrollArea className="flex-1 text-gray-700 overflow-y-auto">
                    <div className="px-4 py-6">

                        <div className="text-center">
                            <div className="flex justify-center mb-4">
                                <CheckCircle2 className="w-16 h-16 text-green-500" />
                            </div>
                            <h1 className="text-2xl font-bold text-primary">
                                Rp502.500
                            </h1>
                            <p className="text-sm text-gray-500">
                                No. INV-00019928874
                            </p>
                        </div>

                        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Status</span>
                                <span className="text-green-600 font-semibold">Berhasil</span>
                            </div>
                            <div className="flex justify-between">
                                <span>No. Ref</span>
                                <span>20393848042135</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tgl Transaksi</span>
                                <span>26 Mei 2025</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Waktu Transaksi</span>
                                <span>15:03:09 WIB</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Metode Pembayaran</span>
                                <span>Saldo</span>
                            </div>
                        </div>

                        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
                            <h2 className="font-bold text-base text-black">Detail Transaksi</h2>
                            <div className="flex justify-between">
                                <span>Produk</span>
                                <span>eSIM Singapore</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Data Tersedia</span>
                                <span>3 GB</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Jumlah</span>
                                <span>1</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Nama Pelanggan</span>
                                <span>George lee</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Nomor Whatsapp</span>
                                <span>********9300</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Email</span>
                                <span>*******lee@gmail.com</span>
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
                                <span>Rp500.000,00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Biaya Transaksi</span>
                                <span>Rp2.500,00</span>
                            </div>
                        </div>
                        <div className="px-4 py-3 border-t">
                            <button className="w-full bg-blue-800 text-white py-3 rounded-full font-semibold my-4">
                                Selesai
                            </button>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}
