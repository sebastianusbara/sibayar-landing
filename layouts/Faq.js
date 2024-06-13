import { markdownify } from "@lib/utils/textConverter";

function Faq({ data }) {
  const { frontmatter } = data;
  const { title, faqs } = frontmatter;

  const scrollToSection = (index) => {
    const sectionId = `faq-${index}`;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section">
      <div className="flex h-fit mx-40">
        <div className="w-64 p-4 border-l h-28 border-gray-200 items-start justify-start sticky top-0">
          <div
            className="mb-4 cursor-pointer rounded text-left hover:bg-gray-300 font-medium"
            onClick={() => scrollToSection(0)}
          >
            Tentang Sibayar
          </div>
          <div
            className="mb-4 cursor-pointer rounded text-left hover:bg-gray-300 font-medium"
            onClick={() => scrollToSection(1)}
          >
            Mitra Sibayar
          </div>
        </div>
        <div className="flex-grow">
          
          <div className="bg-white rounded-lg p-8 shadow-md mb-8" id={`faq-${0}`}>
            <h1 className="text-2xl font-medium mb-8">Tentang Sibayar</h1>
            <ul>
              {faqs.slice(0, 3).map((faq, index) => (
                <li key={index} className="mb-8">
                  <h6 className="font-semibold">{faq.title}</h6>
                  <p className="mt-2 mb-8 text-base">{markdownify(faq.answer)}</p>
                </li>
              ))}
            </ul>
          </div>
         
          <div className="bg-white rounded-lg p-8 shadow-md" id={`faq-${1}`}>
            <h1 className="text-2xl font-medium mb-8">Mitra Sibayar</h1>
            {faqs.slice(3).map((faq, index) => (
              <div key={index} className="mb-8">
                <h6 className="font-semibold">{faq.title}</h6>
                <p className="mt-2 mb-8 text-base">{markdownify(faq.answer)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
