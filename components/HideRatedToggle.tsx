"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface HideRatedToggleProps {
  initialValue: boolean
}

const HideRatedToggle = ({ initialValue }: HideRatedToggleProps) => {
  const [hideRated, setHideRated] = useState(initialValue)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked
    setHideRated(newValue)
    
    // Update URL with the new parameter
    if (newValue) {
      router.push(`/recommendation?hideRated=true`)
    } else {
      router.push(`/recommendation`)
    }
  }

  return (
    <>
      <input
        id="hide-rated"
        type="checkbox"
        checked={hideRated}
        onChange={handleChange}
        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
      />
      <label htmlFor="hide-rated" className="ml-2 text-sm font-medium text-gray-700">
        Hide previously rated companies
      </label>
    </>
  )
}

export default HideRatedToggle