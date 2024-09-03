import Image from "next/image";

interface Props {
  title: string;
  subtitle?: string;
  classname?: string;
}

export default function Title({ title, subtitle, classname }: Props) {
  return (
    <div className={`mt-3 ${classname}`}>
      <a href="/">
        <Image
          src="/imgs/logo.png"
          alt="logo"
          width={250}
          height={250}
          className="inline-block cursor-pointer mb-5"
        />
      </a>

      {subtitle && <h3 className="text-xl mb-5">{subtitle}</h3>}
    </div>
  );
}
