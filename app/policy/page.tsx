import Navbar from "@/components/main/sections/navbar";
import React from "react";
import ContactFooter from "../contact/_components/ContactFooter";
import Footer from "@/components/main/sections/footer";

const PrivacyPolicyPage = () => {
  return (
    <main>
      <Navbar />

      <div
        style={{
          backgroundImage: `url('/j-logo-bg-removed-2.png')`,
          backgroundBlendMode: "multiply",
        }}
        className="min-h-screen bg-left bg-no-repeat bg-fixed w-full bg-primary px-2 py-10 md:py-0"
      >
        <div className="flex justify-center items-center flex-col">
          <div className="w-full flex flex-col justify-start pt-16 items-center relative">
            {/* Form */}
            <div className="text-white max-w-[51rem] mx-auto my-10">
              <h1 className="font-extrabold mb-5 text-3xl text-center">
                KingsBoutique Terms of Service and Privacy Policy
              </h1>

              <p className="mb-4">Effective Date: 2023</p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                1. Account Registration and Security
              </h2>
              <p className="mb-4">
                1.1 To access certain features of our website, you must register
                for an account. You are responsible for maintaining the
                confidentiality of your account information and fully
                accountable for all activities under your account.
              </p>
              <p className="mb-4">
                1.2 You agree to provide accurate, current, and complete
                information during the registration process. KingsBoutique
                reserves the right to suspend or terminate your account if any
                information provided is inaccurate, false, or incomplete.
              </p>

              <h2>2. Privacy and Security</h2>
              <div>
                2.1 Protecting your privacy is a top priority for KingsBoutique.
                <p className="mb-4">Effective Date: 2023</p>
                <p className="mb-4">
                  KingsBoutique is committed to protecting your privacy. This
                  Privacy Policy explains how we collect, use, disclose, and
                  safeguard your personal information when you use our website.
                </p>
                <h2 className="text-xl font-semibold mt-6 mb-2">
                  1. Information We Collect
                </h2>
                <p className="mb-4">
                  We collect information that you provide directly to us, such
                  as when you create an account, make a purchase, or contact us.
                  This may include personal information such as your name, email
                  address, and payment details.
                </p>
                <h2 className="text-xl font-semibold mt-6 mb-2">
                  2. How We Use Your Information
                </h2>
                <p className="mb-4">
                  We use the information we collect for various purposes,
                  including processing your orders, providing customer support,
                  and improving our services. We may also use your information
                  to send you promotional emails and updates, but you can
                  opt-out at any time. If you have any questions or concerns
                  about our Privacy Policy, please contact us at [Contact
                  Email].
                </p>
                <p>
                  2.2 KingsBoutique employs industry-standard security measures
                  to safeguard your personal information. However, while we take
                  all reasonable steps to protect your data, we cannot guarantee
                  absolute security, and you are encouraged to take appropriate
                  measures to protect your own information.
                </p>
              </div>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                3. Payment Integration
              </h2>
              <p>
                3.1 KingsBoutique utilizes secure payment gateways, including
                but not limited to Paystack and Flutterwave, to process
                transactions. By making a purchase through our website, you
                agree to abide by the terms and conditions of the selected
                payment gateway.
              </p>
              <p>
                3.2 You are responsible for any additional fees or charges
                imposed by the payment gateway, including but not limited to
                currency conversion fees.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                4. Orders and Shipping
              </h2>
              <p>
                4.1 All orders placed through our website are subject to
                availability and acceptance. KingsBoutique reserves the right to
                cancel or limit the quantity of any order for any reason.
              </p>
              <p>
                4.2 Shipping and delivery times are estimates and may vary based
                on your location and other factors. KingsBoutique is not
                responsible for any delays in shipping.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                5. Refund and Return Policy
              </h2>
              <p>
                5.1 Our refund and return policy is designed to ensure your
                satisfaction. Please review our{" "}
                <a href="#refund-policy">Refund Policy</a> for detailed
                information on eligibility, process, and timelines.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                6. Intellectual Property
              </h2>
              <p>
                6.1 All content on the KingsBoutique website, including text,
                graphics, logos, images, and software, is the exclusive property
                of KingsBoutique and is protected by copyright, trademark, and
                other intellectual property laws.
              </p>
              <p>
                6.2 You may not use, reproduce, modify, or distribute any
                content from our website without prior written consent from
                KingsBoutique.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                7. Termination of Services
              </h2>
              <p>
                7.1 KingsBoutique reserves the right to terminate or suspend
                services, accounts, or access to the website for any reason,
                without notice.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                8. Governing Law
              </h2>
              <p>
                8.1 These Terms of Service are governed by and construed in
                accordance with the laws of [Your Jurisdiction].
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">
                9. Contact Information
              </h2>
              <p>
                9.1 If you have any questions or concerns about these terms,
                please contact us at [Contact Email].
              </p>

              <p>
                Thank you for choosing KingsBoutique. We appreciate your trust
                and hope you enjoy your shopping experience!
              </p>
            </div>

            <ContactFooter />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PrivacyPolicyPage;
