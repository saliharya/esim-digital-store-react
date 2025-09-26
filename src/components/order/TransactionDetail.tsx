interface TransactionDetailProps {
    product: { name: string };
    selectedSize: string;
    selectedDay: number;
    name: string;
    whatsapp: string;
    email: string;
}

export default function TransactionDetail({
    product,
    selectedSize,
    selectedDay,
    name,
    whatsapp,
    email,
}: TransactionDetailProps) {
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
                    className={`flex justify-between ${detail.isBordered ? "mt-4 border-t pt-2" : ""}`}
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
}
