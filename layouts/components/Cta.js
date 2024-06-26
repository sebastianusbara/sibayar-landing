import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

function Cta({ cta }) {
  return (
    <section className="px-4 mb-[70px] mt-8">
      <div className="section container rounded-xl shadow bg-[whitesmoke]">
        <div className="row  mx-auto items-center justify-center">
          {/* <div className="md:col-5 lg:col-4">
            <Image
              className="w-full"
              src={cta?.image}
              alt="call to action image"
              width={325}
              height={206}
            />
          </div> */}
          <div className="mt-5 text-center md:mt-0 md:text-left md:col-6 lg:col-5">
            <h2 className="text-center">{cta?.title}</h2>
            <p className="text-center mt-6">{markdownify(cta?.content)}</p>
            {cta.button.enable && (
              <Link
                className="block mx-auto w-[160px] text-center btn btn-primary mt-8"
                href={cta.button.link}
                rel={cta.button.rel}
              >
                {cta.button.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
