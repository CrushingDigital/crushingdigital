import { Handler } from '@netlify/functions'
import sgMail, { MailDataRequired } from '@sendgrid/mail'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!

const handler: Handler = async (event, context) => {
  try {
    sgMail.setApiKey(SENDGRID_API_KEY)

    if (!event.queryStringParameters) throw 'Invalid request'

    let email = event.queryStringParameters!.email
    email = 'davidproberts@gmail.com'
    const msg: MailDataRequired = {
      to: email,
      from: 'david@crushing.digital',
      subject: 'I am not here',
      text: 'This goes away!',
      templateId: 'd-0b60cc57ba334337bcc2f3ba579b0f5b',
    }

    await sgMail.send(msg)
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'sent to ' + email }),
    }
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message,
        data: error.event,
      }),
    }
  }
}

function VerifyException(msg: string, event) {
  this.message = msg
  this.event = event
}

export { handler }
