import React, { useState } from 'react'

const Tooltip = ({ text, children }: { text: string; children: React.ReactElement }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false)

  const handleMouseEnter = () => {
    setTooltipVisible(true)
  }

  const handleMouseLeave = () => {
    setTooltipVisible(false)
  }

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isTooltipVisible && (
        <div className="tooltip absolute bottom-10 left-15 bg-gray-800 text-white p-3 whitespace-nowrap rounded-md text-sm">
          {text}
        </div>
      )}
    </div>
  )
}

export default Tooltip
