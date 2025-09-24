import React from "react";

interface ItemCardProps {
    name: string;
    imgUrl: string;
    region: string;
    category: string;
    iconCategory: string;
    price: number;
}

const ItemCard: React.FC<ItemCardProps> = ({
    name,
    imgUrl,
    region,
    category,
    iconCategory,
    price,
}) => {
    return (
        <div className="p-2 w-fit rounded-xl shadow-md">
            <img src={imgUrl} className="rounded-xl w-44 h-48 object-cover" />
            <div className="pl-2">
                <p className="text-xl font-bold pt-4">{name}</p>
                <p className="text-neutral-400 font-bold pt-2">{region}</p>
                <div className="flex items-center pt-2 gap-2">
                    <img src={iconCategory} className="w-4 h-4 object-cover" />
                    <p className="font-medium">{category}</p>
                </div>
                <p className="text-blue-900 font-bold pt-2">Rp{price.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default ItemCard;
