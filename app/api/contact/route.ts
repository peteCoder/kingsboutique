import { formatEmailMessage } from "@/email/format/contactUsFormat";
import { sanityClient } from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

import path from "path";
import fs from "fs"



export const dynamic = "force-dynamic";

export const GET = async (res: NextRequest) => {
  return NextResponse.json({ message: "Working o" }, { status: 200 });
};

export async function POST(req: NextRequest) {
  const userData = await req.json();
  const { name, subject, email, message } = userData;

  const doc = {
    _type: "customer",
    name,
    subject,
    email,
    message,
  };

  const response = await sanityClient.create(doc);

  const { _id } = response;

  // nodemailer transporter instantiation
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    // service: process.env.SMTP_EMAIL_PROVIDER,
    auth: {
      user: process.env.SMTP_EMAIL_USER,
      pass: process.env.SMPT_EMAIL_PASSWORD,
    },
    secure: true,
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });


  // Read image file to attach
  const logoPath = path.join(process.cwd(), 'email_images/kingslogo.jpg');
  const logo = fs.readFileSync(logoPath);

  // Mail Options
  const mailOptions = {
    from: {
      name: `${name}`,
      address: email,
    },
    to: process.env.SMTP_EMAIL_RECEPIENT,
    subject: `Message from Kingsboutiques.com`,
    html: `${formatEmailMessage(userData)}`,
    attachments: [
      {
        filename: 'logo.png',
        content: logo,
        cid: 'logo' // same CID as in the HTML content
      }
    ]
    
  };

  if (_id) {
    // Send mail if the
    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
          return NextResponse.json(
            {
              message:
                "Message was not submitted successful. Please try again.",
              status: 400,
            },
            { status: 400 }
          );
        } else {
          console.log(info);
          resolve(info);
          console.log("Email sent: " + info.response);
          return NextResponse.json(
            { message: "Message was sent successful.", status: 200 },
            { status: 200 }
          );
        }
      });
    });
  } else {
    return NextResponse.json(
      {
        message: "Message was not submitted successful. Try again.",
        status: 400,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message:
        "Your message was successfully received! We will response in due time thank you!",
      status: 200,
    },
    { status: 200 }
  );
}
