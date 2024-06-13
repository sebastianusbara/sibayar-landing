import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  const { footer } = menu;
  return (
    <footer className="section bg-theme-light pb-0">
      <div className="container">
        {/* footer menu */}
        <div className="row">
          {/* social icons */}
          <div className="md-12 sm:col-12 lg:col-12 text-center max-w-[600px] mx-auto">
            <Link href="/" aria-label="Sibayar">
              <Image
                className="mx-auto"
                src={config.site.logo}
                width={config.site.logo_width}
                height={config.site.logo_height}
                alt=""
              />
            </Link>
            <h4>
              PT Digital Voucher Market Bersama
            </h4>
            {markdownify(footer_content, "p", "mt-3")}
            <Social source={social} className="social-icons" />
            <p class="mb-6">
              Email: info@sibayar.id
            </p>
          </div>
        </div>
        {/* copyright */}
        <div className="border-t border-border py-6">
          {markdownify(copyright, "p", "text-sm text-center")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
