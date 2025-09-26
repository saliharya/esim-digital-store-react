import { Wallet, Zap } from "lucide-react";
import React from "react";

interface ItemCardProps {
    name: string;
    image: string;
    region: string;
    category: string;
    price: number;
}

const ItemCard: React.FC<ItemCardProps> = ({
    name,
    image,
    region,
    category,
    price,
}) => {
    return (
        <div className="p-2 w-full sm:w-44 md:w-56 lg:w-96 rounded-xl shadow-md pb-4 
                    flex flex-col lg:flex-row lg:gap-4 transition-transform duration-300 hover:scale-105">
            <img
                src={image}
                className="rounded-xl w-full h-48 sm:h-48 md:h-56 lg:w-48 lg:h-full object-cover flex-shrink-0"
            />
            <div className="pl-0 lg:pl-4 pt-2 lg:pt-0 flex-1 flex flex-col justify-between">
                <div>
                    <p className="font-bold text-slate-900">{name}</p>
                    <p className="text-neutral-400 text-sm pt-1 font-light">{region}</p>
                    <div className="flex items-center gap-2 pt-2">
                        {category === "Instant" && <Zap className="w-4 h-4 text-yellow-500" />}
                        {category === "Topupable" && <Wallet className="w-4 h-4 text-green-500" />}
                        <p className="font-bold text-slate-700">{category}</p>
                    </div>
                </div>
                <p className="text-blue-900 font-bold pt-2 lg:pt-0">Rp{price.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default ItemCard;
