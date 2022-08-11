import { Handler } from '@netlify/functions'
import sgMail, { MailDataRequired } from '@sendgrid/mail'

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!

const handler: Handler = async (event, context) => {
  try {
    sgMail.setApiKey(SENDGRID_API_KEY)

    if (!event.queryStringParameters) throw 'Invalid request'

    let email = event.queryStringParameters!.email
    let template_id = event.queryStringParameters!.template_id
    const msg: MailDataRequired = {
      to: email,
      from: 'david@crushing.digital',
      subject: 'I am not here',
      text: 'This goes away!',
      templateId: template_id,
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

export { handler }
