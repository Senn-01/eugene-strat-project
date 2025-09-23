# 6. Animation System (Framer Motion)

## Core Animation Variants
```javascript
// Button Interaction Animation
export const buttonAnimation = {
  initial: { 
    scale: 1,
    x: 0,
    y: 0 
  },
  hover: { 
    x: -2, 
    y: -2,
    boxShadow: "6px 6px 0px #000000",
    transition: { duration: 0.1, ease: "easeOut" }
  },
  tap: { 
    x: 2, 
    y: 2,
    boxShadow: "2px 2px 0px #000000",
    transition: { duration: 0.05, ease: "easeOut" }
  }
}

// XP Counter Animation
export const xpCounterAnimation = {
  initial: { 
    scale: 0.8, 
    opacity: 0 
  },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 15,
      duration: 0.3
    }
  },
  update: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
}

// Project Placement Animation
export const projectPlaceAnimation = {
  initial: { 
    scale: 0, 
    opacity: 0,
    rotate: -180 
  },
  animate: { 
    scale: 1, 
    opacity: 1,
    rotate: 0,
    transition: { 
      duration: 0.3,
      ease: "backOut",
      delay: 0.1
    }
  },
  exit: {
    scale: 0,
    opacity: 0,
    rotate: 180,
    transition: {
      duration: 0.2,
      ease: "backIn"
    }
  }
}

// Modal Enter/Exit Animation
export const modalAnimation = {
  initial: { 
    scale: 0.9, 
    opacity: 0,
    y: 50 
  },
  animate: { 
    scale: 1, 
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.4
    }
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    y: 50,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
}

// Page Transition Animation
export const pageTransition = {
  initial: { 
    opacity: 0,
    x: 20 
  },
  animate: { 
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut" 
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
}

// Deadline Pulse Animation
export const deadlinePulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.9, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Achievement Notification
export const achievementAnimation = {
  initial: { 
    y: 100, 
    opacity: 0,
    scale: 0.8 
  },
  animate: { 
    y: 0, 
    opacity: 1,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 500,
      damping: 20
    }
  },
  exit: {
    y: -100,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
}

// Boss Battle Star Animation
export const bossBattleAnimation = {
  initial: { 
    scale: 0,
    rotate: -360 
  },
  animate: { 
    scale: 1,
    rotate: 0,
    transition: { 
      type: "spring",
      stiffness: 600,
      damping: 15,
      delay: 0.2
    }
  },
  pulse: {
    scale: [1, 1.2, 1],
    rotate: [0, 10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}
```

## Animation Usage Examples (React 19 Compatible)
```jsx
// Button Component with Animation - React 19 Compatible
import { motion } from "framer-motion"
import { buttonAnimation } from "./animations"

const BrutalButton = ({ children, onClick, variant = "primary", ref, ...props }) => (
  <motion.button
    ref={ref}
    className={`brutal-button ${variant}`}
    onClick={onClick}
    variants={buttonAnimation}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    {...props}
  >
    {children}
  </motion.button>
)

// XP Counter with Update Animation
const XPDisplay = ({ points, isUpdating }) => (
  <motion.div
    className="xp-display"
    variants={xpCounterAnimation}
    initial="initial"
    animate={isUpdating ? "update" : "animate"}
  >
    <span className="xp-icon">⚡</span>
    <span className="xp-number">{points.toLocaleString()} Points</span>
  </motion.div>
)

// Project Node with Placement Animation
const ProjectNode = ({ project, position }) => (
  <motion.div
    className="project-node"
    style={{ left: `${position.x}%`, top: `${position.y}%` }}
    variants={projectPlaceAnimation}
    initial="initial"
    animate="animate"
    exit="exit"
    layout
  >
    <div className={`project-rectangle pattern-${project.category}`}>
      {project.isBossBattle && (
        <motion.span
          className="boss-battle-star"
          variants={bossBattleAnimation}
          initial="initial"
          animate="animate"
        >
          ★
        </motion.span>
      )}
    </div>
  </motion.div>
)
```
