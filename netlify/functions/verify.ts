import { Handler } from '@netlify/functions'
import sgMail from '@sendgrid/mail'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!

const handler: Handler = async (event, context) => {
  try {
    sgMail.setApiKey(SENDGRID_API_KEY)
    if (!event.body) throw new Error('Invalid request')
    let body = JSON.parse(event.body)
    const msg = {
      to: 'davidproberts@gmail.com',
      from: 'david@crushing.digital',
      subject: 'Profile verification - success (' + body.data.to + ')',
      text: 'Congratulations! Your profile has now been verified',
      html: '<strong>Congratulations! Your profile has now been verified</strong>',
    }
    await sgMail.send(msg)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'sent' }),
    }
  } catch (error) {
    console.log('Err', error)
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message,
      }),
    }
  }
}

export { handler }
