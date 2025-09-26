import { Wallet, Banknote } from "lucide-react";

export type PaymentMethod = "saldo" | "bca" | "mandiri" | "bri";

interface PaymentMethodsProps {
    selected: PaymentMethod;
    onChange: (value: PaymentMethod) => void;
}

const paymentMethods = [
    { id: "saldo", name: "Saldo", icon: Wallet },
    { id: "bca", name: "VA BCA", icon: Banknote },
    { id: "mandiri", name: "VA Mandiri", icon: Banknote },
    { id: "bri", name: "VA BRI", icon: Banknote },
];

export default function PaymentMethods({
    selected,
    onChange,
}: PaymentMethodsProps) {
    return (
        <div className="mt-6 space-y-4">
            <h2 className="font-bold text-lg text-black">Pilih Metode Pembayaran</h2>

            <div className="space-y-3">
                {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                        <label
                            key={method.id}
                            className="flex items-center justify-between w-full border border-gray-300 rounded-lg px-4 py-3 cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-gray-600" />
                                <span className="text-gray-700">{method.name}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                {method.id === "saldo" && (
                                    <span className="text-sm text-gray-500">Rp100.000</span>
                                )}
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method.id}
                                    checked={selected === method.id}
                                    onChange={() => onChange(method.id as PaymentMethod)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-600"
                                />
                            </div>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}
