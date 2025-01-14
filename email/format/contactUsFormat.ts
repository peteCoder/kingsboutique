// export const formatEmailMessage = (userData: {
//   name: string;
//   message: string;
//   subject: string;
//   email: string;
// }) => {
//   const { name, message, subject, email } = userData;

//   const userMessage = `
//     <img src="cid:logo" alt="Logo" />
//     <h1>
//         <strong>Name: ${name ? name : ""} </strong>
//     </h1>
//       <h1>
//         <strong>Customer Email: ${email}</strong>
//       </h1>
//       <br/>
//       <h1>
//           <strong>Phone Number: ${subject}</strong>
//       </h1>

//       <h1>
//           <strong>Message: ${message}</strong>
//       </h1>
//     `;

//   return userMessage;
// };



export const adminFormatEmailMessage = (userData: {
  name: string;
  message: string;
  subject: string;
  email: string;
}) => {
  const { name, message, subject, email } = userData;

  const userMessage = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="cid:logo" alt="Logo" style="max-width: 150px;" />
      </div>
      <h2 style="color: #333; text-align: center; margin-bottom: 40px;">Customer Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; border: 1px solid #eaeaea; font-weight: bold;">Name:</td>
          <td style="padding: 10px; border: 1px solid #eaeaea;">${name ? name : "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eaeaea; font-weight: bold;">Email:</td>
          <td style="padding: 10px; border: 1px solid #eaeaea;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eaeaea; font-weight: bold;">Subject:</td>
          <td style="padding: 10px; border: 1px solid #eaeaea;">${subject}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #eaeaea; font-weight: bold;">Message:</td>
          <td style="padding: 10px; border: 1px solid #eaeaea;">${message}</td>
        </tr>
      </table>
      
    </div>
  `;

  return userMessage;
};




export const userFormatEmailMessage = (userData: {
  name: string;
  message: string;
  subject: string;
  email: string;
}) => {
  const { name, message, subject, email } = userData;

  const userMessage = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="cid:logo" alt="Logo" style="max-width: 150px;" />
      </div>  
    
      <div style="text-align: center; margin-top: 40px;">
        <p style="color: #555;">Thank you for contacting us. We will get back to you soon.</p>
      </div>
    </div>
  `;

  return userMessage;
};



