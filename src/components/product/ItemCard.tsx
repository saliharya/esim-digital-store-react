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
        <div className="p-2 w-fit rounded-xl shadow-md pb-8">
            <img src={image} className="rounded-xl w-44 h-48 object-cover" />
            <div className="pl-2">
                <p className="font-bold pt-4 text-slate-900">{name}</p>
                <p className="text-neutral-400 text-sm pt-2 font-light">{region}</p>
                <div className="flex items-center gap-2 pt-2">
                    {category === "Instant" && <Zap className="w-4 h-4 text-yellow-500" />}
                    {category === "Topupable" && <Wallet className="w-4 h-4 text-green-500" />}
                    <p className="font-bold text-slate-700">{category}</p>
                </div>
                <p className="text-blue-900 font-bold pt-2">Rp{price.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default ItemCard;
