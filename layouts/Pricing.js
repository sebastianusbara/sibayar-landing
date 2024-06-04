import Link from "next/link";
import Cta from "./components/Cta";

const Dialog = ({ onClose }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
    <div className="bg-white p-5 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4">Dialog Title</h2>
      <p className="mb-4">This is the dialog content.</p>
      <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded">
        Close
      </button>
    </div>
  </div>
);

function Pricing({ data }) {
  const {
    frontmatter: { title, plans, call_to_action },
  } = data;
  return (
    <>
      <section className="section pb-0">
        <div className="container">
          <h1 className="text-center font-normal">{title}</h1>
          <div className="section row -mt-10 justify-center md:mt-0">
            {plans.map((plan, index) => (
              <div
                className={`col-12 md:col-4 ${
                  !plan.recommended ? "lg:px-0" : "col-recommended"
                }`}
                key={plan.title + index}
              >
                <div className="card text-center">
                  <h4>{plan.title}</h4>
                  <div className="mt-5">
                    <span className="text-5xl text-dark">${plan.price}</span>
                    <span>/ {plan.type}</span>
                  </div>
                  <h5 className="mt-2 font-normal text-text">
                    {plan.subtitle}
                  </h5>
                  <ul className="mt-5">
                    {plan.features.map((feature, index) => (
                      <li className="mb-[10px] leading-5" key={index}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    className={`btn mt-5 ${
                      plan.recommended ? "btn-primary" : "btn-outline-primary"
                    }`}
                    href={plan.button.link}
                    rel={plan.button.rel}
                  >
                    {plan.button.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Cta cta={call_to_action} />
    </>
  );
}

export default Pricing;
