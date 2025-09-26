interface DropdownSelectProps {
    label: string;
    options: string[];
    value: string | null;
    onChange: (val: string | null) => void;
}

export default function DropdownSelect({ label, options, value, onChange }: DropdownSelectProps) {
    return (
        <select
            value={value || ""}
            onChange={(e) => onChange(e.target.value || null)}
            className="w-48 px-4 py-3 border rounded-md bg-primary text-white"
        >
            <option value="" className="bg-primary/30 text-white">
                {label}
            </option>
            {options.map((opt) => (
                <option key={opt} value={opt} className="bg-primary/30 text-white">
                    {opt}
                </option>
            ))}
        </select>
    );
}
