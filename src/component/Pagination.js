import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

import styles from '../styles/Pagination.module.css';

const Pagination = ({ updatePage, currentPage, totalPages }) => {

    const handlePrev = () => {
        if (currentPage > 1) {
            updatePage(prev => prev - 1);
        }
    }

    const handleNext = () => {
        if (totalPages !== currentPage) {
            updatePage(prev => prev + 1);
        }
    }

    return (
        <div className={styles.pagination}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
                <IoIosArrowRoundBack />
            </button>
            <p>{currentPage}</p>
            <button onClick={handleNext} disabled={totalPages === currentPage}>
                <IoIosArrowRoundForward />
            </button>
        </div>
    )
}

export default Pagination;