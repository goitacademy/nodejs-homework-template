import 'dotenv/config'
import nodemailer from 'nodemailer'

const { UKR_NET_PASSWORD, UKR_NET_FROM } = process.env

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_FROM,
    pass: UKR_NET_PASSWORD,
  },
}

const transport = nodemailer.createTransport(nodemailerConfig)

const sendEmail = async (data) => {
  const email = { ...data, from: UKR_NET_FROM }
  await transport.sendMail(email)
  return true
}

export default sendEmail
