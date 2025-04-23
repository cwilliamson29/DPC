import React from 'react'

interface Props {
    title: string;
    children: any;
}

function Card({title, children}: Props) {
    return (
        <div className="flex flex-col items-center justify-center md:max-w-2xl md:w-sm border-1 border-white rounded-md shadow-lg overflow-hidden">
            <div className="w-[100%] overflow-hidden  bg-gray-500 text-center p-1 text-lg font-bold">{title}</div>
            <div className="w-[100%] p-1 pl-10 ">
                {children}
            </div>
        </div>
    )
}

export default Card
