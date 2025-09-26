interface PaymentInfoProps {
    paymentMethod: string;
}

export default function PaymentInfo({ paymentMethod }: PaymentInfoProps) {
    const date = new Date();
    return (
        <div className="mt-6 border-t pt-4 space-y-2 text-sm lg:mt-8 lg:pt-6 lg:space-y-3 lg:text-base">
            <h2 className="font-bold text-base text-black lg:text-xl border-b pb-2 mb-2">Informasi Pembayaran</h2>
            <div className="flex justify-between">
                <span>Status</span>
                <span className="text-green-600 font-semibold">Berhasil</span>
            </div>
            <div className="flex justify-between">
                <span>Tgl Transaksi</span>
                <span>{date.toLocaleDateString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
                <span>Waktu Transaksi</span>
                <span>{date.toLocaleTimeString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
                <span>Metode Pembayaran</span>
                <span className="font-semibold text-gray-800">{paymentMethod}</span>
            </div>
        </div>
    );
}
