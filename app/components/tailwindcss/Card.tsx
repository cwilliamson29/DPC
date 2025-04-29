import React from 'react'

interface ColorOptions {
    title: string;
    body: string;
    text: string;
}

interface Props {
    title: string;
    width?: string;
    colorOptions?: ColorOptions;
    children: any;
}

function Card({title, width, colorOptions, children}: Props) {
    let color: ColorOptions
    if (!colorOptions) {
        color = {
            title: "bg-gray-500",
            body: "bg-gray-300",
            text: "text-black",
        }
    } else {
        color = colorOptions
    }
    const boxWidth = width ? width : "md:w-lg"

    return (
        <div className={boxWidth + " flex flex-col items-center justify-center border-1 border-gray-500 rounded-md shadow-lg overflow-hidden "}>
            <div className={"w-[100%] overflow-hidden text-center p-1 text-lg font-bold " + color.title}>{title}</div>
            <div className={"w-[100%] p-1 flex " + color.body + " " + color.text}>
                {children}
            </div>
        </div>
    )
}

export default Card
