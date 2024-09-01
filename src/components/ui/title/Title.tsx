import { titleFont } from "@/config/fonts";

interface Props {
    title: string;
    subtitle?: string;
    classname?: string;
}

export default function Title({ title, subtitle, classname }: Props) {
  return (
    <div className={`mt-3 ${classname}`}>
        <h1 className={`${titleFont.className} text-4xl font-semibold antialiased my-7`}>
        { title }
        </h1>
        { subtitle && (
            <h3 className="text-xl mb-5">{subtitle}</h3>
        )}
    </div>
  );
}