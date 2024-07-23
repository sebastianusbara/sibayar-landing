import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Join = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
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
          {markdownify(title, "h2", "font-normal mb-5")}
            <form
              className="contact-form"
              method="POST"
              action={contact_form_action}
            >
                <div className="mb-5 row">
                    <div className="col-6">
                        <input
                            className="form-input w-full rounded"
                            name="name"
                            type="text"
                            placeholder="Nama Depan"
                            required
                            />
                    </div>
                    <div className="col-6">
                        <input
                        className="form-input w-full rounded"
                        name="name"
                        type="text"
                        placeholder="Nama Belakang"
                        required
                        />
                    </div>
                </div>

              <div className="mb-5">
                <input
                  className="form-input w-full rounded"
                  name="email"
                  type="email"
                  placeholder="E-mail"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  className="form-input w-full rounded"
                  name="whatsapp"
                  type="text"
                  placeholder="Nomor Whatsapp"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  className="form-input w-full rounded"
                  name="whatsapp"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  className="form-input w-full rounded"
                  name="whatsapp"
                  type="password"
                  placeholder="Konfirmasi Password"
                  required
                />
              </div>
              <button type="submit" className="btn block w-full btn-primary">
                Daftar Sekarang
              </button>
            </form>
            <div className="mt-5 text-center">
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