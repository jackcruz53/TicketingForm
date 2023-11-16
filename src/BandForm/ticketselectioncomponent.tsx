import React, { useEffect, useState } from "react"

export interface TicketType {
    type: string
    name: string
    description: string
    cost: number
  }
  
interface TicketTypeSelectorProps {
    ticketTypes: TicketType[]
    onQuantityChange?: ({}) => void
}

const TicketTypeSelector: React.FC<TicketTypeSelectorProps> = ({ ticketTypes, onQuantityChange }) => {
  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    if (onQuantityChange) {
      onQuantityChange(quantities)
    }
  }, [quantities, onQuantityChange])
  
  const handleQuantityChange = (type: string, quantity: number) => {
    setQuantities((prevQuantities) => ({ ...prevQuantities, [type]: quantity }))
    if (onQuantityChange) {
      onQuantityChange({ ...quantities, [type]: quantity })
    }
  }

  const totalCost = ticketTypes.reduce((total, ticketType) => {
    //@ts-ignore
    const quantity = quantities[ticketType.type] || 0
    return total + quantity * ticketType.cost
  }, 0)

  return (
    <div className="ticket-type-selector">
      {ticketTypes.map((ticketType) => (
      <div className="ticket-info">
        <div key={ticketType.type}>
        <h3>{ticketType.name}</h3>
        <p>{ticketType.description}</p>
        <p>${ticketType.cost}</p>
      </div>
       <input
         type="number"
         className="quantity-input"
         id={`quantity-${ticketType.type}`}
         min={0}
         //@ts-ignore
         value={quantities[ticketType.type] || 0}
         onChange={(e) => handleQuantityChange(ticketType.type, parseInt(e.target.value, 10) || 0)}
       />
        </div>
      ))}
      <div className="ticket-type-selector-total">
        <h3>Total</h3>
        <h3>${totalCost}</h3>
      </div>
    </div>
  )
}

export default TicketTypeSelector