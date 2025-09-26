import { Sheet } from "react-modal-sheet";
import { useState } from "react";

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    options: string[];
}

export default function BottomSheet({
    isOpen,
    onClose,
    title,
    options,
}: BottomSheetProps) {
    const [selected, setSelected] = useState<string | null>(null);

    const handleReset = () => setSelected(null);

    return (
        <Sheet isOpen={isOpen} onClose={onClose}>
            <Sheet.Container>
                <Sheet.Header>
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <button
                            onClick={handleReset}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Reset
                        </button>
                    </div>
                </Sheet.Header>

                <Sheet.Content>
                    <div className="p-4 space-y-3">
                        {options.map((opt) => (
                            <label
                                key={opt}
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name="bottomsheet-radio"
                                    value={opt}
                                    checked={selected === opt}
                                    onChange={() => setSelected(opt)}
                                />
                                <span>{opt}</span>
                            </label>
                        ))}
                    </div>
                </Sheet.Content>
            </Sheet.Container>

            <Sheet.Backdrop onTap={onClose} />
        </Sheet>
    );
}
