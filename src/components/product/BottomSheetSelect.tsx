import { useState } from "react";
import { Sheet } from "react-modal-sheet";

interface BottomSheetSelectProps {
    label: string;
    options: string[];
    value: string | null;
    onChange: (val: string | null) => void;
}

export default function BottomSheetSelect({ label, options, value, onChange }: BottomSheetSelectProps) {
    const [isOpen, setOpen] = useState(false);

    const handleSelect = (val: string) => {
        onChange(val);
        setOpen(false);
    };

    const handleReset = () => {
        onChange(null);
        setOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="w-[180px] px-3 py-2 border rounded-md text-left text-white bg-primary"
            >
                {value || label}
            </button>

            <Sheet isOpen={isOpen} onClose={() => setOpen(false)} detent="content" snapPoints={[0, 0.8, 1]}>
                <Sheet.Container>
                    <Sheet.Header>
                        <div className="flex items-center justify-between px-4 py-3 border-b">
                            <h2 className="text-lg font-semibold">{label}</h2>
                            <button onClick={handleReset} className="text-sm text-blue-600 hover:underline">
                                Reset
                            </button>
                        </div>
                    </Sheet.Header>
                    <Sheet.Content>
                        <div className="p-4 space-y-3">
                            {options.map((opt) => (
                                <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={label}
                                        value={opt}
                                        checked={value === opt}
                                        onChange={() => handleSelect(opt)}
                                    />
                                    <span>{opt}</span>
                                </label>
                            ))}
                        </div>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onTap={() => setOpen(false)} />
            </Sheet>
        </>
    );
}
