import { useState } from 'react'
import './Form.css'
import { Cards } from './Cards'

export function Form() {

    const [name, setName] = useState('') //store name
    const [nameError, setNameError] = useState('')

    const [cardNumber, setCardNumber] = useState('') //store card number
    const [cardNumberError, setCardNumberError] = useState('')

    const [monthVal, setMonthVal] = useState('') //store month value
    const [monthValError, setMonthValError] = useState('')

    const [yearVal, setYearVal] = useState('') // store year value
    const [yearValError, setYearValError] = useState('')

    const [cvcNumber, setCvcNumber] = useState('') // store cvc number
    const [cvcNumberError, setCvcNumberError] = useState('')

    const [formSubmitted, setFormSubmitted] = useState(false);

    //Submit Formulary
    function submitForm(e: any) {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            setFormSubmitted(true);
        }
    }

    //Continue button returns to the formulary
    function continueForm(e: any) {
        e.preventDefault();
        setFormSubmitted(false);
    }

    //Validate Formulary
    function validateForm() {
        let isValid = true;


        // Check if is a number
        const isNumber = (value: any) => {
            return /\d/.test(value);
        }
        // Name input validation
        const nameValue = name.trim()
        if (nameValue === '') {
            setNameError('Name cannot be blank');
            isValid = false;
        } else if (isNumber(nameValue)) {
            setNameError('Name cannot be a number')
        } else if (nameValue.length < 3) {
            setNameError('Name must contain at least 3 letters')
            isValid = false;
        } else {
            setNameError('')
        }

        // Card number input validation
        const cardNumberValue = cardNumber.trim()
        const cnValue = parseInt(cardNumber)
        if (cardNumberValue.length === 0) {
            setCardNumberError('Card number cannot be blank')
            isValid = false;
        } else if (isNaN(cnValue)) {
            setCardNumberError('Wrong format, numbers only')
            isValid = false;
        } else if (cardNumber.length !== 19) {
            setCardNumberError('Wrong format, is not a credit card')
            isValid = false;
        } else {
            setCardNumberError('')
        }

        // Month input validation
        const monthNumber = parseInt(monthVal)

        if (monthVal.length === 0) {
            setMonthValError('Month cannot be blank')
            isValid = false;
        } else if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
            setMonthValError('This is not a month')
            isValid = false;
        } else {
            setMonthValError('')
        }

        const yearNumber = parseInt(yearVal)

        if (yearVal.length === 0) {
            setYearValError('Year cannot be blank')
            isValid = false;
        } else if (isNaN(yearNumber) || yearNumber < 24) {
            setYearValError('Year cannot be in the past')
            isValid = false;
        } else {
            setYearValError('')
        }

        const cvcValue = parseInt(cvcNumber)

        if (cvcNumber.length === 0) {
            setCvcNumberError('Cannot be blank')
            isValid = false;
        } else if (isNaN(cvcValue) || cvcNumber.length > 3 || cvcNumber.length < 3) {
            setCvcNumberError('Wrong format')
        } else {
            setCvcNumberError('')
        }

        return isValid;
    }

    // Add space after 4 digits in card number input
    function formatCardNumber(value: any) {
        const newValue = value.replace(/\s/g, '');
        return newValue.replace(/(\d{4})/g, '$1 ').trim();
    }
    function handleCardNumberChange(e: any) {
        const newValue = formatCardNumber(e.target.value)
        setCardNumber(newValue);
    }

    return (
        <div className="formContainer">
            <Cards
                name={name}
                cardNumber={cardNumber}
                monthVal={monthVal}
                yearVal={yearVal}
                cvcNumber={cvcNumber}
            />
            {formSubmitted ? (
                <div className="result">
                    <img src='./icon-complete.svg'></img>
                    <h1>Thank You!</h1>
                    <p>We've added your card details</p>
                    <button onClick={continueForm}>Continue</button>
                </div>
            ) : (
                <form id='form'>
                    <fieldset>
                        <div className='inputControl'>
                            <label>Cardholder name</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                placeholder='e.g. Jane Appleased'
                                className={nameError ? 'error' : ''}
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                            </input>
                            <div className='errorMsg'><p>{nameError}</p></div>
                        </div>
                        <div className='inputControl'>
                            <label>Card number</label>
                            <input
                                type='text'
                                id='cardNumber'
                                name='cardNumber'
                                placeholder='e.g. 1234 5678 9123 0000'
                                className={cardNumberError ? 'error' : ''}
                                value={cardNumber}
                                onChange={handleCardNumberChange}>
                            </input>
                            <div className='errorMsg'><p>{cardNumberError}</p></div>
                        </div>
                        <div className='valContainer'>
                            <div className='valDiv'>
                                <label>Exp.date (MM/YY)</label>
                                <input
                                    type='text'
                                    id='monthVal'
                                    name='monthVal'
                                    placeholder='MM'
                                    className={monthValError ? 'error' : ''}
                                    value={monthVal}
                                    onChange={(e) => setMonthVal(e.target.value)}>
                                </input>
                                <input
                                    type='text'
                                    id='yearVal'
                                    name='yearVal'
                                    placeholder='YY'
                                    className={yearValError ? 'error' : ''}
                                    value={yearVal}
                                    onChange={(e) => setYearVal(e.target.value)}>
                                </input>
                                <div className='errorMsg'>
                                    <p>{monthValError}</p>
                                    <p>{yearValError}</p>
                                </div>
                            </div>
                            <div className='cvcDiv'>
                                <label>CVC</label>
                                <input
                                    type='text'
                                    id='cvcNumber'
                                    name='cvcNumber'
                                    placeholder='e.g. 123'
                                    className={cvcNumberError ? 'error' : ''}
                                    value={cvcNumber}
                                    onChange={(e) => setCvcNumber(e.target.value)}>
                                </input>
                                <div className='errorMsg'>
                                    <p>{cvcNumberError}</p>
                                </div>
                            </div>
                        </div>
                        <button type='submit' onClick={submitForm}>Confirm</button>
                    </fieldset>
                </form>
            )}


        </div>
    )
}