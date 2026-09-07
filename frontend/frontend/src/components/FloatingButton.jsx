import { motion } from "framer-motion";

function FloatingButton({ onClick }) {

    return (

        <motion.div
            className="floating-wrapper"
            drag
            dragMomentum={false}
            dragElastic={0.1}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
        >

            <button
                className="floating-btn"
                onClick={onClick}
            >
                AI
            </button>

        </motion.div>

    );

}

export default FloatingButton;