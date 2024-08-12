import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailTrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email Sent Successfully");
  } catch (error) {
    console.error(`Error sending verification`, error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "e2d30bf7-b9c7-4209-93e6-eb06d5e5abfc",
      template_variables: {
        company_info_name: "Auth Company",
        name: name,
      },
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email", error);

    throw new Error(`Error sending welcome email: ${error}`);
  }
};

// const { MailtrapClient } = require("mailtrap");

// const TOKEN = "********d928";
// const ENDPOINT = "https://send.api.mailtrap.io/";

// const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

// const sender = {
//   email: "mailtrap@demomailtrap.com",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   {
//     email: "freelancershawon16@gmail.com",
//   },
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     template_uuid: "e2d30bf7-b9c7-4209-93e6-eb06d5e5abfc",
//     template_variables: {
//       company_info_name: "Test_Company_info_name",
//       company_info_address: "Test_Company_info_address",
//       company_info_city: "Test_Company_info_city",
//       company_info_zip_code: "Test_Company_info_zip_code",
//       company_info_country: "Test_Company_info_country",
//     },
//   })
//   .then(console.log, console.error);
