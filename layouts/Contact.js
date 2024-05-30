import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <section className="section">
      <div className="container max-w-[920px]">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="section row pb-0">
          <div className="col-12 md:col-6 lg:col-6">
            <a href="https://www.google.com/maps/place/Tokopedia+Care/@-6.1726729,106.7226474,15.39z/data=!4m6!3m5!1s0x2e69f71e018ea799:0x1c7ace5e69ee8071!8m2!3d-6.1728591!4d106.7302265!16s%2Fg%2F11fwbpk6n5?entry=ttu" target="_blank">
                <Image
                  src={'/images/maps.png'}
                  height="500"
                  width="1000"
                  alt={title}
                  priority={true}
                  layout="responsive"
                  className="rounded-lg"
                />
              </a>
          </div>
          <div className="content col-12 md:col-6 lg:col-6">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
