export const formatEmailMessage = (userData: {
  name: string;
  message: string;
  subject: string;
  email: string;
}) => {
  const { name, message, subject, email } = userData;

  const userMessage = `
    <h1>
        <strong>Name: ${name ? name : ""} </strong>
    </h1>
      <h1>
        <strong>Customer Email: ${email}</strong>
      </h1>
      <br/>
      <h1>
          <strong>Phone Number: ${subject}</strong>
      </h1>

      <h1>
          <strong>Message: ${message}</strong>
      </h1>
    `;

  return userMessage;
};
