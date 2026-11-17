
import { motion, AnimatePresence } from "motion/react";
import "./RewardPopup.css";

function RewardPopup({ isOpen, onClose }) {

  const particles = Array.from({ length: 16 });

  return (
    <AnimatePresence>
      {isOpen && (
        
        <motion.div
          className="reward-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >

          <motion.div
            className="reward-card"
            onClick={(e) => e.stopPropagation()}

            initial={{
              opacity: 0,
              scale: 0.5,
              y: 100,
              rotateX: 25
            }}

            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotateX: 0
            }}

            exit={{
              opacity: 0,
              scale: 0.6,
              y: 80
            }}

            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12
            }}
          >

            {/* Close Button */}
            <button
              className="reward-close"
              onClick={onClose}
            >
              ✕
            </button>

            {/* Particles */}
            <div className="reward-particles">
              {particles.map((_, index) => (
                <span
                  key={index}
                  style={{
                    "--i": index,
                    "--total": particles.length
                  }}
                />
              ))}
            </div>

            {/* Heading */}
            <motion.div
              className="reward-heading"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span>✦ SPECIAL REWARD ✦</span>
              <h2>WELCOME BONUS!</h2>
              <p>Thanks for joining our gaming world</p>
            </motion.div>

            {/* Gift Box */}
            <motion.div
              className="reward-gift"

              initial={{ scale: 0, rotate: -30 }}
              animate={{
                scale: [0, 1.2, 1],
                rotate: [-30, 15, -10, 0],
                y: [50, -10, 0]
              }}

              transition={{
                delay: 0.5,
                duration: 1,
                ease: "easeOut"
              }}
            >
              <div className="gift-glow"></div>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                🎁
              </motion.div>
            </motion.div>

            {/* Reward Amount */}
            <motion.div
              className="reward-amount"

              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}

              transition={{
                delay: 1.2,
                type: "spring",
                stiffness: 150
              }}
            >
              <span>🪙</span>
              <h1>500 COINS</h1>
              <p>Added to your reward collection</p>
            </motion.div>

            {/* Collect Button */}
            <motion.button
              className="reward-collect"

              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}

              whileHover={{
                scale: 1.07,
                boxShadow: "0 0 30px #ffcc33"
              }}

              whileTap={{ scale: 0.94 }}

              transition={{ delay: 1.6 }}

              onClick={onClose}
            >
              COLLECT REWARD
            </motion.button>

            <p className="reward-footer">
              YOUR GAMING JOURNEY STARTS HERE!
            </p>

          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RewardPopup;
