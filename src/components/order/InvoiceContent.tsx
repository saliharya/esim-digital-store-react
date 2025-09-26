import { CheckCircle2, CheckIcon, ClipboardIcon } from "lucide-react";
import { useState } from "react";
import TransactionDetail from "./TransactionDetail";
import PaymentInfo from "./PaymentInfo";

interface InvoiceContentProps {
    invoiceState: any;
}

export default function InvoiceContent({ invoiceState }: InvoiceContentProps) {
    const [copied, setCopied] = useState(false);

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
        }
    };

    return (
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

            <PaymentInfo paymentMethod={paymentMethod} />

            <TransactionDetail
                product={product}
                selectedSize={selectedSize}
                selectedDay={selectedDay}
                name={name}
                whatsapp={whatsapp}
                email={email}
            />

            <div className="mt-6">
                <button
                    onClick={() => window.location.href = "/"}
                    className="w-full bg-blue-800 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                    Selesai
                </button>
            </div>
        </div>
    );
}
