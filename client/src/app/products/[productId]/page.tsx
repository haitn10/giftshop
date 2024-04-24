import { Metadata } from "next";

type Props = {
  params: {
    productId: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const title = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Product ${params.productId}`);
    }, 1000);
  });

  return {
    title: `Product ${title}`,
    description: `Details product ${title}`,
  };
};

export default function ProductDetails({ params }: Props) {
  return (
    <>
      <h1>Details product {params.productId}</h1>
    </>
  );
}
