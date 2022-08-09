import { Handler } from '@netlify/functions'
import sgMail from '@sendgrid/mail'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!

const handler: Handler = async (event, context) => {
  sgMail.setApiKey(SENDGRID_API_KEY)
  const msg = {
    to: 'davidproberts@gmail.com', // Change to your recipient
    from: 'david@crushing.digital', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  let response
  try {
    response = await sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  } catch (error) {
    console.log('Err', error)
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message,
      }),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: response.message }),
  }
}

export { handler }
