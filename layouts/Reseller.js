import Image from "next/image";

function Reseller({ data }) {
  const { frontmatter } = data;
  const { partners, payment } = frontmatter;

  return (
    <section className="section">
      <div className="container max-w-[1020px]">
        <div className="row">
            <div className="col-6 pr-4">
                <div className="shadow p-8 h-[560px]">
                    <h3 className="text-center">
                        Transaksi Reseller
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mt-8 justify-center align-center">
                        {payment.images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            width={200}
                            height={200}
                            alt={`Image ${index}`}
                        />
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-6 pl-4">
                <div className="shadow p-8 h-[560px]">
                    <h3 className="text-center">
                        Voucher Game
                    </h3>
                    <div className="grid grid-cols-6 gap-8 mt-8">
                        {partners.images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            width={100}
                            height={100}
                            alt={`Image ${index}`}
                        />
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

export default Reseller;
