import InvoiceContent from "@/components/order/InvoiceContent";
import Header from "@/components/product/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Printer, Home } from "lucide-react";
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

export default function InvoicePage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const invoiceState = state as InvoiceState | undefined;

    if (!invoiceState?.product) {
        return <div className="p-4">Produk tidak ditemukan</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-primary lg:bg-gray-100 lg:justify-center lg:items-center">
            {/* Mobile Header */}
            <div className="pt-8 text-white px-4 lg:hidden">
                <Header
                    title="Invoice"
                    showStepper={true}
                    steps={["Checkout", "Invoice"]}
                    currentStep={3}
                />
            </div>

            {/* LG Layout Landscape */}
            <div className="lg:w-[900px] lg:h-[600px] lg:rounded-2xl lg:shadow-2xl lg:overflow-hidden lg:bg-white lg:flex lg:flex-row">
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

                <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-4xl h-[90vh] flex flex-col lg:static lg:h-auto lg:rounded-t-none lg:flex-1">
                    <ScrollArea className="flex-1 text-gray-700 overflow-y-auto">
                        <InvoiceContent invoiceState={invoiceState} />
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
