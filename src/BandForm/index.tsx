import React, { useState } from "react"
import { Icon, Typography, debounce } from "@mui/material"
import { DateRange, Place } from "@mui/icons-material"
import TicketTypeSelector, { TicketType } from "./ticketselectioncomponent"
import './index.css'

const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }

interface BandFormProps {
    band: {
        name: string
        date: number
        location: string
        imgUrl: string
        description_blurb: string
        ticketTypes: TicketType[]
        id: string
    }
}

const creditCardRegex = /^(?:[0-9]{4}[\s-]?){4}$/
const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/


const BandForm: React.FC<BandFormProps> = (data) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [ccNumber, setCCNumber] = useState('')
    const [ccExp, setCCExp] = useState('')
    const [ccv, setCCV] = useState()
    const [ticketsOrder, setTicketsOrder] = useState({})
    const { name, date, location, imgUrl, description_blurb, ticketTypes, id } = data.band
    //id is imported but unused, use for localstorage to persist form info
    //if in a multipage app, the id should be used for url routing  //actblue.com/tickets/{id}


    //This is where a function that would send data to the local storage would go as to persist data in the event of a timeout or refresh
    const dispatchChange = () => {}

    const displayDate = new Date(date)

    const formIsInvalid = (!firstName || !lastName || !address || !ccNumber || !ccExp || !ccv || !ticketsOrder)

    const handleFormChange = (value: any, onChange: any, regex?: any) => {
        //add regex validation for cc and exp date
        onChange(value)
        debounce(dispatchChange, 250)
    }

    const onSubmit = () => {
        console.log({
            firstName,
            lastName,
            address,
            cardInfo:{
                ccNumber,
                ccv,
                ccExp
            },
            ticketsOrder
        }
        )
    }

    return (
        <div className="band-form-component">
            <div className="band-form-component-left">
                <h1>{name}</h1>
                <div><Icon component={DateRange}/>{displayDate.toLocaleString('en-US',dateOptions)}</div>
                <div><Icon component={Place}/>{location}</div>
                {imgUrl && <img src={imgUrl} alt={name} style={{ maxWidth: '100%' }} />}
                <Typography variant="body2" color="textSecondary" dangerouslySetInnerHTML={{ __html: description_blurb }}/>
            </div>
            <div className="band-form-component-right">
                <h1>Select Tickets</h1>
                <TicketTypeSelector ticketTypes={ticketTypes} onQuantityChange={setTicketsOrder}/>
                <div className="payment-info">
                    <input value={firstName} onChange={(e) => handleFormChange(e.target.value, setFirstName)} placeholder="First Name" />
                    <input value={lastName} onChange={(e) => handleFormChange(e.target.value, setLastName)} placeholder="Last Name" />
                    <input
                        value={address}
                        onChange={(e) => handleFormChange(e.target.value, setAddress)}
                        placeholder="Address"
                    />
                    <input value={ccNumber} onChange={(e) => handleFormChange(e.target.value, setCCNumber, creditCardRegex)} placeholder="Credit Card Number" />
                    <input value={ccExp} onChange={(e) => handleFormChange(e.target.value, setCCExp, expiryDateRegex)} placeholder="MM/YY" />
                    <input value={ccv} onChange={(e) => handleFormChange(e.target.value, setCCV)} placeholder="CCV" />
                </div>
                <button className="submit-button" onClick={onSubmit} disabled={formIsInvalid}>Get Tickets</button>
            </div>
        </div>
    )
}

export default BandForm