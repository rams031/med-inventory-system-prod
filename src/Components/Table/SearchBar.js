import React from 'react'
import { SearchIcon } from "@heroicons/react/solid";

const SearchBar = (props) => {
    return (
        <>
            <div className="bg-white rounded-t-md mb-3">
                <div className="py-3">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <SearchIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-lightgreen focus:border-lightgreen block w-45 pl-10"
                            placeholder="Search for items"
                            onInput={(e) => {
                                props.onSearch(e.target.value.toLowerCase());
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(SearchBar)
