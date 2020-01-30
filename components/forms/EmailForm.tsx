import React, { useState } from 'react'
import styled from 'styled-components'
import addToMailchimp from '../../utils/addToMailchimp'


import Input from '../ui/Input'
import Button from '../ui/Button'

interface EmailFormProps {
  isFooter: boolean
}

export const EmailForm = (props: EmailFormProps) => {
  const [email, setEmail] = useState('')
  const [isEntering, setIsEntering] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addToMailchimp(email)
      .then((data: any) => {
        alert(data.msg)
      })
      .catch((error: Error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
        if (error.message === 'Timeout') {
          alert(
            'Looks like your browser is blocking this. Try to disable any tracker-blocking feature and resubmit.'
          )
        }
        console.error(error)
      })
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEntering(true)
    setEmail(event.currentTarget.value)
  }

  return (
    <StyledForm
      id="newsletter-signup"
      onSubmit={handleSubmit}
      isFooter={props.isFooter}
    >
      <Input
        placeholder="Your email..."
        name="email"
        type="text"
        onChange={handleEmailChange}
        onFocus={handleEmailChange}
      />
      {props.isFooter ? (
        isEntering && <Button type="submit">Subscribe</Button>
      ) : (
        <Button type="submit" primary>
          Subscribe
        </Button>
      )}
    </StyledForm>
  )
}

EmailForm.defaultProps = {
  isFooter: false,
}

const StyledForm = styled('form')`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto;
  grid-gap: 1rem;
  width: 100%;
  max-width: 38rem;
  padding: 0;

  @media (min-width: 800px) {
    grid-template-rows: auto;
    grid-template-columns: auto 8rem;
  }

  ${props =>
    props.isFooter &&
    css`
      width: auto;
      ${Input} {
        width: 18rem;
        background: rgba(0, 0, 0, 0.1);
        color: white;
        ::placeholder {
          color: white;
        }
      }
    `};
`
