import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Stepper from "../ui/Stepper";

interface HeaderProps {
    title: string;
    showStepper?: boolean;
    steps?: string[];
    currentStep?: number;
}

export default function Header({
    title = "Travel eSIM",
    showStepper = true,
    steps = [],
    currentStep = 0,
}: HeaderProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        if (location.pathname === "/") {
            navigate("/");
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="flex items-center gap-2 mb-4">
            <button onClick={handleBack} className="p-1">
                <ArrowLeft className="h-5 w-5 text-primary-foreground" />
            </button>

            <div className="flex flex-1 justify-between items-center">
                <h1 className="text-xl font-bold">{title}</h1>

                {showStepper && steps.length > 0 && (
                    <Stepper steps={steps} currentStep={currentStep} />
                )}
            </div>
        </div>
    );
}
