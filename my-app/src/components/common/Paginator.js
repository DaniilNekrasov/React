import React, { useState } from "react";
import styles from './Paginator.module.css';
import cn from "classnames"


let Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChanged }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let portionSize = 10
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portion, setPortion] = useState(1)
    let lBorder = (portion - 1) * portionSize + 1
    let rBorder = portion * portionSize

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        {
            portion > 1 &&
            <span>
                <button onClick={() => setPortion(1)}>start</button>
                <button onClick={() => setPortion(portion - 1)}>prev</button>
            </span>}
        {
            pages.filter(p => p >= lBorder && p <= rBorder).map
                (p => {
                    return <span className={cn({
                        [styles.selectedPage]:currentPage === p}, styles.pageNumber) }
                        key = {p} onClick={(e) => (onPageChanged(p))}> {p} </span>
                })
        }
        {
            portion < portionCount &&
            <span>
                <button onClick={() => setPortion(portion + 1)}>next</button>
                <button onClick={() => setPortion(portionCount)}>end</button>
            </span>}
    </div>
}

export default Paginator;