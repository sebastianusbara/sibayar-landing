import { markdownify } from "@lib/utils/textConverter";

function Terms({ data }) {
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
        <div className="flex-grow">
          
          <div className="bg-white rounded-lg p-8 shadow-md mb-8" id={`faq-${0}`}>
            <h1 className="text-2xl font-medium mb-8">
                {title}
            </h1>
            <ul>
              {faqs.map((faq, index) => (
                <li key={index} className="mb-8">
                  <h6 className="font-semibold">{faq.title}</h6>
                  <p className="mt-2 mb-8 text-base">{markdownify(faq.answer)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Terms;
