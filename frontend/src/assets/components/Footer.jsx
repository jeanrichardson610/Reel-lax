import React from "react";

const Footer = () => {
  return (
    <div className="text-[#00e5ff] md:px-10">
      {/* Center container, keep text left */}
      <div className="max-w-7xl mx-auto">
        <div className="py-20">
          <p>Developed by Jean Richardson</p>
          <p>
            Long day? Stressful evening? Kick back, grab some snacks and achieve zen with Zenime
          </p>
          <p className="pb-5">Questions? Contact us.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-25 pb-10 text-sm">
          <ul className="flex flex-col space-y-2 text-left">
            <li>FAQ</li>
            <li>Partners</li>
            <li>Privacy</li>
            <li>Connection Test</li>
          </ul>

          <ul className="flex flex-col space-y-2 text-left">
            <li>Help Center</li>
            <li>Careers</li>
            <li>Cookie Preferences</li>
            <li>Legal Notices</li>
          </ul>

          <ul className="flex flex-col space-y-2 text-left">
            <li>Account</li>
            <li>Ways to Watch</li>
            <li>Media Center</li>
            <li>Exclusive to Reel-lax</li>
          </ul>

          <ul className="flex flex-col space-y-2 text-left">
            <li>About Us</li>
            <li>Terms of Use</li>
            <li>Troubleshooting</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
