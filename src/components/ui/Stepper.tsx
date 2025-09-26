import { Check } from "lucide-react";

interface StepperProps {
    steps: string[];
    currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {

    return (
        <div className="flex items-center justify-end">
            {steps.map((_, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                    <div key={index} className="flex items-center">
                        <div
                            className={`
                w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold
                ${isActive
                                    ? "bg-indigo-700 text-white"
                                    : isCompleted
                                        ? "bg-indigo-200 text-indigo-700"
                                        : "bg-gray-200 text-gray-500"
                                }
                cursor-pointer
              `}
                        >
                            {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                        </div>

                        {index < steps.length - 1 && (
                            <div
                                className={`
                  h-0.5 w-6
                  ${isCompleted ? "bg-indigo-200" : "bg-gray-300"}
                `}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
