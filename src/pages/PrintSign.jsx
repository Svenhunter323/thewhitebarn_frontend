import PrintableReviewSign from '../components/common/PrintableReviewSign';
import PageSEO from '../components/seo/PageSEO';

const PrintSign = () => {
  return (
    <>
      <PageSEO
        title="Printable Review Sign - The White Barn FL"
        description="Printable A4 review sign for The White Barn FL with QR code for guest reviews."
        canonical="/print-sign"
        ogImage="/_og/print-sign.jpg"
        pageType="webpage"
        schemaProps={{
          name: "The White Barn FL - Printable Review Sign",
          description: "Printable review sign with QR code for guest feedback collection.",
          amenityFeatures: [
            "QR Code Reviews",
            "Guest Feedback",
            "Printable Sign",
            "Digital Integration"
          ]
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
        <section className="py-24 px-4">
            <PrintableReviewSign />
        </section>
      </div>
    </>
  );
};

export default PrintSign;
