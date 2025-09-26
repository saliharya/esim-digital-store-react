import Header from "@/components/product/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, CheckIcon, ClipboardIcon, Printer, Home } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface InvoiceState {
    product: { name: string };
    selectedSize: string;
    selectedDay: number;
    name: string;
    email: string;
    whatsapp: string;
    paymentMethod: string;
    price: number;
    transactionFee: number;
}

interface TransactionDetailProps {
    product: { name: string };
    selectedSize: string;
    selectedDay: number;
    name: string;
    whatsapp: string;
    email: string;
}

export default function InvoicePage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const invoiceState = state as InvoiceState | undefined;

    const [copied, setCopied] = useState(false);

    if (!invoiceState?.product) {
        return <div className="p-4">Produk tidak ditemukan</div>;
    }

    const {
        product,
        selectedSize,
        selectedDay,
        name,
        email,
        whatsapp,
        paymentMethod,
        price,
        transactionFee,
    } = invoiceState;

    const invoiceNumber = `INV-${Math.floor(Math.random() * 1e15)
        .toString()
        .padStart(15, "0")}`;

    const total = price + transactionFee;

    const handleCopy = () => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(invoiceNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } else {
            console.error("Clipboard access denied or not available.");
        }
    };

    const TransactionDetail: React.FC<TransactionDetailProps> = ({
        product,
        selectedSize,
        selectedDay,
        name,
        whatsapp,
        email,
    }) => {
        const details = [
            { label: "Produk", value: product.name },
            { label: "Data Tersedia", value: selectedSize },
            { label: "Durasi", value: `${selectedDay} hari` },
            { label: "Nama Pelanggan", value: name, isBordered: true },
            { label: "Nomor Whatsapp", value: whatsapp },
            { label: "Email", value: email },
        ];

        return (
            <div className="mt-6 border-t pt-4 space-y-2 text-sm lg:mt-8 lg:pt-6 lg:space-y-3 lg:text-base">
                <h2 className="font-bold text-base text-black lg:text-xl border-b pb-2 mb-2">
                    Detail Transaksi
                </h2>

                {details.map((detail, index) => (
                    <div
                        key={index}
                        className={`flex justify-between ${detail.isBordered ? "mt-4 border-t pt-2" : ""
                            }`}
                    >
                        <span>{detail.label}</span>
                        <span className="font-medium text-gray-800">{detail.value}</span>
                    </div>
                ))}

                <p className="text-xs text-gray-500 mt-3 p-2 bg-yellow-50 rounded-lg lg:text-sm">
                    Kami akan segera mengirimkan kode QR eSIM ke email Anda. Cek inbox (atau folder spam) ya!
                </p>
            </div>
        );
    };

    const InvoiceContent = () => (
        <div className="px-4 py-6 lg:p-10 flex flex-col">
            <div className="text-center">
                <div className="flex justify-center mb-4">
                    <CheckCircle2 className="w-16 h-16 text-green-500 lg:w-20 lg:h-20" />
                </div>
                <h1 className="text-2xl font-bold text-primary lg:text-4xl">
                    Rp{total.toLocaleString("id-ID")}
                </h1>
                <div className="flex items-center justify-center gap-2 mt-3 p-2 bg-gray-50 rounded-lg w-fit mx-auto">
                    <p className="text-sm text-gray-700 lg:text-base font-medium">{invoiceNumber}</p>
                    <button
                        onClick={handleCopy}
                        className="p-1 rounded-md hover:bg-gray-200 transition"
                        title="Copy invoice"
                    >
                        {copied ? (
                            <CheckIcon className="w-4 h-4 text-green-500" />
                        ) : (
                            <ClipboardIcon className="w-4 h-4 text-gray-500" />
                        )}
                    </button>
                </div>
            </div>

            <div className="mt-6 border-t pt-4 space-y-2 text-sm lg:mt-8 lg:pt-6 lg:space-y-3 lg:text-base">
                <h2 className="font-bold text-base text-black lg:text-xl border-b pb-2 mb-2">Informasi Pembayaran</h2>
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
                    <span className="font-semibold text-gray-800">{paymentMethod}</span>
                </div>
            </div>

            <TransactionDetail
                product={product}
                selectedSize={selectedSize}
                selectedDay={selectedDay}
                name={name}
                whatsapp={whatsapp}
                email={email}
            />

            <div className="mt-6 border-t pt-4 space-y-2 text-sm lg:mt-8 lg:pt-6 lg:space-y-3 lg:text-base">
                <h2 className="font-bold text-base text-black lg:text-xl border-b pb-2 mb-2">Rincian Pembayaran</h2>
                <div className="flex justify-between">
                    <span>Harga Paket</span>
                    <span>Rp{price.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                    <span>Biaya Transaksi</span>
                    <span>Rp{transactionFee.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between font-extrabold text-black text-base lg:text-xl pt-2 border-t mt-2">
                    <span>TOTAL BAYAR</span>
                    <span>Rp{total.toLocaleString("id-ID")}</span>
                </div>
            </div>

            <div className="mt-6">
                <button
                    onClick={() => navigate("/")}
                    className="w-full bg-blue-800 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                    Selesai
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-primary lg:bg-gray-100 lg:justify-center lg:items-center">
            <div className="pt-8 text-white px-4 lg:hidden">
                <Header
                    title="Invoice"
                    showStepper={true}
                    steps={["Checkout", "Invoice"]}
                    currentStep={3}
                />
            </div>

            <div className="lg:w-[900px] lg:h-[600px] lg:rounded-2xl lg:shadow-2xl lg:overflow-hidden lg:bg-white lg:flex lg:flex-row">
                {/* Sidebar / Header Actions */}
                <div className="hidden lg:flex lg:flex-col lg:w-1/3 lg:bg-primary lg:text-white lg:p-6 lg:justify-between">
                    <Header title="Invoice Pembayaran" />
                    <div className="flex space-x-3 mt-4">
                        <button
                            onClick={() => window.print()}
                            className="p-2 rounded-full hover:bg-white/20 transition"
                            title="Cetak Invoice"
                        >
                            <Printer className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="p-2 rounded-full hover:bg-white/20 transition"
                            title="Kembali ke Beranda"
                        >
                            <Home className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Konten Invoice */}
                <div className="lg:w-2/3 lg:flex-1 lg:flex lg:flex-col">
                    <ScrollArea className="flex-1 text-gray-700 overflow-y-auto">
                        <InvoiceContent />
                    </ScrollArea>
                </div>
            </div>
        </div>

    );
}
