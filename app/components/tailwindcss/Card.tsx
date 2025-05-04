import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFloppyDisk, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";

interface ColorOptions {
    title: string;
    body: string;
    text: string;
    border: string;
}

interface Options {
    setEditing: () => void;
    edit: boolean | false;
    showEdit: boolean;
}

interface Props {
    title: string;
    width?: string;
    colorOptions?: ColorOptions;
    options?: Options
    children: any;
}

function Card({title, width, colorOptions, options, children}: Props) {
    let color: ColorOptions
    if (!colorOptions) {
        color = {
            title: "bg-gray-500",
            body: "bg-gray-300",
            text: "text-black",
            border: "border-gray-500",
        }
    } else {
        color = colorOptions
    }
    const borderColor = options?.edit ? "border-red-700" : color.border
    const boxWidth = width ? width : "md:w-lg"
    const determineOptions = () => {
        if (options) {
            return options.showEdit;
        } else {
            return false
        }
    }
    const titleCSS = () => {
        const base = "w-[100%] overflow-hidden text-center p-1 text-lg font-bold flex  "
        if (options?.showEdit) {
            return base + " justify-between " + color.title
        } else {
            return base + " justify-center " + color.title
        }
    }
    return (
        <div className={boxWidth + " flex flex-col items-center justify-center border-3 rounded-md shadow-lg overflow-hidden " + borderColor + " " + color.title}>
            <div className={titleCSS()}>
                {determineOptions() &&
                    <div onClick={() => options?.setEditing()}>
                        {options?.edit ? <FontAwesomeIcon icon={faFloppyDisk}/> : <FontAwesomeIcon icon={faPenToSquare}/>}
                    </div>
                }
                <div>
                    {title}
                </div>
                {determineOptions() &&
                    <div>
                        <FontAwesomeIcon icon={faTrash}/>
                    </div>
                }
            </div>
            <div className={"w-[100%] p-1 flex " + color.body + " " + color.text}>
                {children}
            </div>
        </div>

    )
}

export default Card
