import React, { useState } from 'react'
import axios from 'axios'
import styles from './WaitListInput.module.scss'
import Button from '../button/Button'
import InputField from '../inputField/InputField'

const WaitListInput = () => {
  const [email, setEmail] = useState<string>('')
  const [state, setState] = useState('idle')
  const [message, setMessage] = useState<String | null>(null)
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setState('Loading')

    try {
      //   const response = await axios.post('/api/subscribe', { email })
      setState('Success')
      setEmail('')
    } catch (error: any) {
      setMessage(error.response.data.error.message)
      setState('Error')
    }
  }
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <InputField
            required
            type="email"
            name="email"
            id="email"
            className={styles.input}
            placeholder="Enter your e-mail to get started"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            icon="/svgs/mail.svg"
          />
          <Button className={styles.inputButton} type="submit" disabled={state === 'Loading'}>
            Join Waitlist
          </Button>
        </div>
        {state === 'Error' && (
          <div className={`${styles.newsLetter_message} ${styles.newsLetter_error}`}>
            <p>{message}</p>
          </div>
        )}
        {state === 'Success' && (
          <div className={`${styles.newsLetter_message} ${styles.newsLetter_success}`}>
            <p>Thanks for Subscribing! We have sent you an email.</p>
          </div>
        )}
      </form>
    </div>
  )
}

export default WaitListInput
