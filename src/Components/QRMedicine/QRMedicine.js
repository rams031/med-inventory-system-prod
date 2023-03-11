import React from "react";
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';

const QrMedicine = () => {
    // const medicineName = useQueryParam('name');
    const medicineName = useQueryParam('name');
    const categoryName = useQueryParam('categoryName');
    const strength = useQueryParam('strength');
    const expiration = useQueryParam('expiration');
    const quantity = useQueryParam('quantity');
    const reference_no = useQueryParam('reference_no');
    const description = useQueryParam('description');
    const [image] = useQueryParam('image', StringParam);

    return (<div className="min-h-screen bg-white w-full flex flex-col p-10">
        <div className="flex flex-row justify-between py-2">
            <div>
                <div className="text-3xl font-bold text-yellow-600 capitalize"> {medicineName ?? "--"}</div>
            </div>
            <div>
                <img src={image} width="100" height="100" />
            </div>
        </div>
        <div className="p-5 shadow-lg rounded-lg flex flex-col gap-1 border-y-2 border-yellow-600">
            <div className="text-yellow-800 text-md font-bold"><span className="text-md font-semibold text-yellow-600">Category Name:</span> {categoryName ?? "--"}</div>
            <div className="text-yellow-800 text-md font-bold"><span className="text-md font-semibold text-yellow-600">Strength:</span> {strength ?? "--"}</div>
            <div className="text-yellow-800 text-md font-bold"><span className="text-md font-semibold text-yellow-600">Reference No:</span> {reference_no ?? "--"}</div>
            <div className="text-yellow-800 text-md font-bold"><span className="text-md font-semibold text-yellow-600">Expiration:</span> {expiration ?? "--"}</div>
            <div className="text-yellow-800 text-md font-bold"><span className="text-md font-semibold text-yellow-600">Quantity:</span> {quantity ?? "--"}</div>
            <div className="text-yellow-800 text-md font-bold"><span className="text-md font-semibold text-yellow-600">Description:</span> {description ?? "--"}</div>
        </div>
        <div className="text-xs text-yellow-600 flex justify-center py-5 font-semibold">Medicine Inventory System</div>
    </div>);
}

export default QrMedicine;
