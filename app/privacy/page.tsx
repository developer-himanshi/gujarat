export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-primary">Privacy Policy</h1>
      <p className="mb-4">
        Website: <a href="https://gujarat.ai" className="text-primary underline">https://gujarat.ai</a>
      </p>
      <p className="mb-4">Operated by: MatchBest Software</p>

      <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
      <p className="mb-4">
        This Privacy Policy explains how Gujarat.ai collects, uses, and safeguards your personal information.
        By using our platform, you agree to the terms described here.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Your name, email, or phone if you fill forms or register.</li>
        <li>Technical details like IP, browser, and session data for analytics.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">How We Use Your Data</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To provide and improve our services.</li>
        <li>To display relevant businesses and tourism information.</li>
        <li>For analytics and internal improvements.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Data Sharing</h2>
      <p className="mb-4">
        We do not sell your data. We may share it with trusted partners for operations or when required by law.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Request data deletion.</li>
        <li>Withdraw consent for data use.</li>
        <li>Contact us for privacy inquiries.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Contact</h2>
      <p className="mb-4">
        Email: <a href="mailto:contact@matchbestsoftware.com" className="text-primary underline">contact@matchbestsoftware.com</a>
      </p>
    </div>
  );
}
