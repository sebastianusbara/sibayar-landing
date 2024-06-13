import { markdownify } from "@lib/utils/textConverter";

function Solution({ data }) {
  const { frontmatter } = data;
  const { title, solution, intro } = frontmatter;
  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        {markdownify(intro, "p", "text-center font-normal mt-8")}
        <div className="section row  -mt-6">
          {solution.map((item, index) => (
            <div key={index} className="col-12 mt-6 md:col-6">
              <div className="p-12 shadow h-[200px]">
                <div className="faq-head relative">
                  {markdownify(item.title, "h4")}
                </div>
                {markdownify(item.answer, "p", "faq-body mt-4")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Solution;
