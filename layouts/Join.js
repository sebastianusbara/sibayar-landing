import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import Image from "next/image";

const Join = ({ data }) => {
  const { frontmatter } = data;
  const { title, info, link, description } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <section className="section">
      <div className="container">
        <div className="row pb-0">
          <div className="content col-12 md:col-6 lg:col-6">
            <Link href="/faq" className="mt-5 p-12 block shadow w-[360px] text-2xl">
              <span className="faq-head relative">
                FAQ
              </span>
            </Link>
            <Link href="/ketentuan-layanan" className="mt-5 p-12 block shadow w-[360px] text-2xl">
              <span className="faq-head relative">
                Ketentuan Layanan
              </span>
            </Link>
            <Link href="/kebijakan-privasi" className="mt-5 p-12 block shadow w-[360px] text-2xl">
              <span className="faq-head relative">
                Kebijakan Privasi
              </span>
            </Link>
          </div>
          <div className="col-12 md:col-6 lg:col-6">
            {markdownify(title, "h2", "font-normal mb-5 text-center")}
            <Image
              src={'/images/banner-art.svg'}
              height="500"
              width="1000"
              alt={title}
              priority={true}
              layout="responsive"
              className="rounded-lg mt-10"
            />
            <span className="mt-4 text-base font-normal flex justify-center items-center text-center">{description}</span>
            <div className="relative d-flex order-1 ml-auto hidden min-w-[200px] items-center justify-end md:ml-0 md:flex md:order-2 mt-8">
              <Link className="btn btn-primary z-0 py-[14px] w-full text-center" href={link} rel="">
                Daftar Sekarang
              </Link>
            </div>
            <div className="mt-2 text-center">
              <span className="mr-2">
                Sudah punya akun?
              </span>
              <Link className="text-teal-600 underline" href="https://sibayar.id/dashboard/auth/signin">
                Masuk Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;