import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  return (
    <footer className="section relative mt-12 py-[30px] bg-[#222] border-t-4 border-black dark:bg-[#111]">
<ImageFallback
        className="-z-[1] object-cover object-left md:object-top"
        src="/images/footer-bg-shape.svg"
        alt="footer background"
        fill={true}
      />
      <div className="container text-center text-light">
        <div className="mb-6 inline-flex">
          <Logo />
        </div>
        {markdownify(footer_content, "p", "max-w-[638px] mx-auto")}

        {/* footer menu */}
        <ul className="mb-12 mt-6 flex-wrap space-x-2 lg:space-x-4">
          {menu.footer.map((menu) => (
            <li className="inline-block" key={menu.name}>
              <Link
                href={menu.url}
                className="p-2 font-bold text-dark hover:text-primary dark:text-darkmode-light lg:p-4 text-light"
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* social icons */}
        <div className="inline-flex">
          <Social source={social} className="socials mb-12 justify-center text-light" />
        </div>
        {/* copyright */}
        <div className="flex justify-center items-center">
          Desenvolvido por - Patriotas que amam o Brasil. <img src={'/images/brasil.png'} alt="Brasil" className="mx-4"/> ©2023 Boicotaqui. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
