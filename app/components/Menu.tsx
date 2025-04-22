import React from 'react'
import {menuData} from "~/data/menuData";

function Menu() {
    return (
        <div className="w-[200px] h-[100vh] bg-gray-900">
            <ul className="">
                {menuData.map((item, i) => {
                    return (
                        <a href={"/" + item.link} key={i}>
                            <li key={i} className="py-5 pl-3 border-b-1 border-gray-700 hover:bg-gray-500">
                                <a href={"/" + item.link}>{item.title}</a>
                            </li>
                        </a>
                    )
                })}
            </ul>
        </div>
    )
}

export default Menu
