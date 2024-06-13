import { markdownify } from "@lib/utils/textConverter";

function Solution({ data }) {
  const { frontmatter } = data;
  const { title, solution, intro } = frontmatter;
  return (
    <section className="section">
      <div className="container max-w-[1020px]">
        {markdownify(title, "h1", "text-center font-normal")}
        {markdownify(intro, "p", "text-xl text-center font-normal mt-4")}
        <div className="pt-8 row  -mt-6">
          {solution.map((item, index) => (
            <div key={index} className="col-12 mt-6 md:col-4">
              <div className="p-12 shadow">
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
